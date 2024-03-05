export const Categories = ({categoriesData}) => {
    return (
        <div>
            <h2 className="text-xl font-medium mb-3">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoriesData.map((category, index) => (
                    <div className="card w-full bg-base-100 shadow-xl" key={index}>
                        <figure>
                            <img src={category.imageSrc} alt={category.name} />
                        </figure>
                        <div className="card-body">
                            <h3 className="text-center">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}