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
    const [quantity, setQuantity] = useState(1);


    return (
        <div className="">
            <div className='flex flex-col items-start lg:items-center lg:flex-row  mb-11'>
                <div className='flex flex-col gap-6 lg:w-2/4'>
                    <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                    <div className='flex justify-center h-24'>
                        <div className="flex flex-row gap-2">
                            <img src={images.img1} alt="" className='w-1/4 h-20 md:h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img1)} />
                            <img src={images.img2} alt="" className='w-1/4 h-20 md:h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img2)} />
                            <img src={images.img3} alt="" className='w-1/4 h-20 md:h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img3)} />
                            <img src={images.img4} alt="" className='w-1/4 h-20 md:h-24 rounded-md cursor-pointer hover:outline' onClick={() => setActiveImage(images.img4)} />
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
                    <div className='flex flex-row items-center md:gap-12 gap-6'>
                        <div className='flex flex-row items-center'>
                            <button className='bg-gray-200 py-2 px-5 rounded-lg text-primary text-3xl' onClick={() => setQuantity((prev) => { return prev > 0 ? (prev - 1) : prev })}>-</button>
                            <span className='py-4 px-6 rounded-lg'>{quantity}</span>
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-primary text-3xl' onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        </div>
                        <button className='bg-primary text-white font-semibold md:py-3 py-4 px-4 md:px-16 rounded-xl h-full' onClick={() => document.getElementById('my_modal_5').showModal()}>Add to Cart</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Sucessfull!</h3>
                                <p className="py-4">Item Sucessfully Added to Cart</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            <div role="tablist" className="tabs tabs-lifted w-full overflow-x-scroll">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Details" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <p>This Apple MacBook Pro (MPXQ2LL/A) has a high-resolution LED-backlit 13.3-inch widescreen Retina display (2560 x 1600 native resolution). Powered by Intel Core i5 (2.3GHz) and Intel Iris Plus Graphics 640. Solid State Drive capacity of 256GB with 8GB of RAM. Supports Mac OS. Bundle includes Black Case, Wireless Mouse, and Bluetooth Headset! This device has been tested to be in great working condition. It will show signs of use and cosmetic blemishes which may included some scratched/dings, all of which do not affect the usability of this device. (Refurbished)</p>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Specification" checked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> <td className="font-bold">Features</td> <td>Webcam</td> </tr> <tr> <td className="font-bold">Operating System</td> <td>Mac OS</td> </tr> <tr> <td className="font-bold">Processor Type</td> <td>Intel Core i5</td> </tr> <tr> <td className="font-bold">RAM Memory</td> <td>8 GB</td> </tr> <tr> <td className="font-bold">Hard Drive Capacity</td> <td>256 GB</td> </tr> <tr> <td className="font-bold">Screen Size</td> <td>13.3 in</td> </tr> <tr> <td className="font-bold">Processor Core Type</td> <td>Dual-core (2 Core)</td> </tr> <tr> <td className="font-bold">Battery Life</td> <td>10 h</td> </tr> <tr> <td className="font-bold">Maximum RAM Supported</td> <td>16 GB</td> </tr> <tr> <td className="font-bold">Processor Speed</td> <td>2.3 GHz</td> </tr> <tr> <td className="font-bold">Brand</td> <td>Apple</td> </tr> <tr> <td className="font-bold">Condition</td> <td>Pre-Owned: Like New</td> </tr> <tr> <td className="font-bold">Manufacturer Part Number</td> <td>MPXQ2LL/A</td> </tr> <tr> <td className="font-bold">Model</td> <td>MPXQ2LL/A</td> </tr> <tr> <td className="font-bold">Product Line</td> <td>MacBook Pro</td> </tr> <tr> <td className="font-bold">Manufacturer</td> <td>Apple</td> </tr> <tr> <td className="font-bold">Wireless Technology</td> <td>IEEE 802.11ac, Bluetooth, Wi-Fi, 802.11ac</td> </tr> <tr> <td className="font-bold">Assembled Product Dimensions (L x W x H)</td> <td>8.40 x 12.00 x 0.59 Inches</td> </tr>
                        </tbody>
                    </table>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Review" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className=" text-center flex flex-col items-center gap-2">
                        <h2 className=" font-bold">Add a review</h2>
                        <div className="rating">
                            <label htmlFor="rating">Your rating:</label>
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <textarea className="input input-bordered input-lg w-full max-w-xs" name="youur_rating" cols="30" rows="30"></textarea>
                        <input className="input input-bordered input-lg bg-primary" type="submit" value="submit" />
                        <div className=" self-start flex gap-2 items-center">
                            <div className="avatar">
                                <div className="w-24 rounded">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div>
                                <p>Superb conditioned refurbished Mac, well packaged, out of the box as new, great purchase!</p>
                                <div className="flex gap-2">
                                    <b>John Doe</b>
                                    <p>JAN 22, 2024</p>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}