export const NewProducts = ({ productsData }) => {
    return (
        <>
            <div className="my-3">
                <h2 className="text-xl font-medium mb-3">New Products</h2>
                <div className="flex flex-wrap gap-8">
                    {productsData.map((product,index) => (
                        <div className="card w-80 bg-base-100 shadow-xl">
                            <figure>
                                <img src={product.imageSrc} alt={product.altText} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product.title}
                                    {product.isNew && <div className="badge badge-secondary">NEW</div>}
                                </h2>
                                <p>{product.description}</p>
                                <div className="flex justify-between content-center">
                                    <div className="card-actions justify-start">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                    <div className="card-actions content-center flex justify-center">
                                        {product.categories.map((category, index) => (
                                            <div className="badge badge-outline" key={index}>
                                                {category}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}