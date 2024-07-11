from django.db import models
from typing import Any
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.core.validators import RegexValidator
from django.core.mail import send_mail
from django.conf import settings

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if email is None:
            raise ValueError("Email field is empty")
        email = self.normalize_email(email=email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email: str | None = ..., password: str | None = ..., **extra_fields: Any):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_active") is not True:
            raise ValueError("Superuser must be active")
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    phone_number_regex = RegexValidator(
        regex=r'^(\+977)?\d{9,10}$',
        message="Phone number must be entered in the format: '+977'. Up to 10 digits allowed."
    )
    email = models.EmailField(blank=False, unique=True, null=False)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    phone_number = models.CharField(validators=[phone_number_regex], max_length=14, blank=True)
    address = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True)
    house_no = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    class Meta:
        verbose_name = 'Ecommerce Registered Customer'
        verbose_name_plural = 'Ecommerce Registered Customers'

    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self) -> str:
        return f"{self.first_name}"

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def save(self, *args, **kwargs):
        is_new_user = self.pk is None
        super().save(*args, **kwargs)
        if is_new_user:
            self.send_registration_email()

    def send_registration_email(self):
        subject = "Successful Registration"
        message = f"Dear {self.get_full_name()},\n\nThank you for registering with our platform. We're excited to have you on board!"
        from_email = settings.DEFAULT_FROM_EMAIL
        self.email_user(subject, message, from_email)