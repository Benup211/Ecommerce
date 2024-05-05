import React from 'react';

function EsewaPaymentForm() {
  return (
    <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="p-4 border rounded">
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input type="text" id="amount" name="amount" value="100" className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="tax_amount" className="form-label">Tax Amount</label>
        <input type="text" id="tax_amount" name="tax_amount" value="10" className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="total_amount" className="form-label">Total Amount</label>
        <input type="text" id="total_amount" name="total_amount" value="110" className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="transaction_uuid" className="form-label">Transaction UUID</label>
        <input type="text" id="transaction_uuid" name="transaction_uuid" value="ab14a8f2b02c3" className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="product_code" className="form-label">Product Code</label>
        <input type="text" id="product_code" name="product_code" value="EPAYTEST" className="form-control" required />
      </div>
      <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" />
      <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" />
      <div className="mb-3">
        <label htmlFor="success_url" className="form-label">Success URL</label>
        <input type="text" id="success_url" name="success_url" value="https://esewa.com.np" className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="failure_url" className="form-label">Failure URL</label>
        <input type="text" id="failure_url" name="failure_url" value="https://google.com" className="form-control" required />
      </div>
      <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
      <div className="mb-3">
        <label htmlFor="signature" className="form-label">Signature</label>
        <input type="text" id="signature" name="signature" value="YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=" className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default EsewaPaymentForm;
