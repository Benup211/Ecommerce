import React, { useState } from "react";
export const Description = () => {
    const [images, setImages] = useState({
        img1: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/01.jpg",
        img2: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/01_2.jpg",
        img3: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/01_3.jpg",
        img4: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/01_5.jpg"
    })

    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);


    return (
        <div>
            <div className='flex flex-col items-start lg:items-center lg:flex-row  mb-11'>
                <div className='flex flex-col gap-6 lg:w-2/4'>
                    <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                    <div className='flex justify-center h-24'>
                        <div className="flex flex-row gap-2">
                            <img src={images.img1} alt="" className='w-1/4 h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img1)} />
                            <img src={images.img2} alt="" className='w-1/4 h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img2)} />
                            <img src={images.img3} alt="" className='w-1/4 h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img3)} />
                            <img src={images.img4} alt="" className='w-1/4 h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img4)} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:w-2/4 h-full p-4'>
                    <div>
                        <span className=' text-primaryfont-semibold'>Laptop</span>
                        <h1 className='text-3xl font-bold'>MacBook Pro 13.3″ 16GB/512GB Silver</h1>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <div className="flex">
                                <p>(4.50) 2 Reviews</p>
                                <button className="mx-2 outline lg:px-2 px-1 rounded-sm btn-secondary">In Stock</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            <span className="text-4xl text-primary">$1000 </span>
                            <span className="line-through text-3xl">$1200</span>
                        </p>
                        <ul className="text-lg list-disc p-4">
                            <li>RAM: 16GB</li>
                            <li>Hard Drive: 256GB SSD</li>
                            <li>Screen Size: 13.3 inches</li>
                        </ul>
                        <div className="bg-base-200 p-4 rounded-md">
                            <ul className="text-lg list-disc p-4 text-primary">
                                <li>Estimated delivery time 14-30 days</li>
                                <li>18 months warranty at Genuine Warranty Center.</li>
                                <li>Whats in the box: 30W Power Adapter and Block</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                            <button className='bg-gray-200 py-2 px-5 rounded-lg text-primary text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                            <span className='py-4 px-6 rounded-lg'>{amount}</span>
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-primary text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                        </div>
                        <button className='bg-primary text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                    </div>
                </div>
            </div><div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Product Details" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <p>This Apple MacBook Pro (MPXQ2LL/A) has a high-resolution LED-backlit 13.3-inch widescreen Retina display (2560 x 1600 native resolution). Powered by Intel Core i5 (2.3GHz) and Intel Iris Plus Graphics 640. Solid State Drive capacity of 256GB with 8GB of RAM. Supports Mac OS. Bundle includes Black Case, Wireless Mouse, and Bluetooth Headset! This device has been tested to be in great working condition. It will show signs of use and cosmetic blemishes which may included some scratched/dings, all of which do not affect the usability of this device. (Refurbished)</p>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Specification" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Review" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">None</div>
            </div>
        </div>
    );
}