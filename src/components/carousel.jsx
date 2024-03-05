export const Carousel = () => {
    return (
        <>
            <div className="carousel w-full max-h-96 min-h-48">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://www.theitdepot.com/assets/images/banners/index_65df235aab90f.png" className="w-full h-auto object-contain" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://promotions.newegg.com/nepro/24-0215/1920x660.jpg" className="w-full h-auto object-contain" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://www.theitdepot.com/images/headerScroll_new/gaming%20x%20slim.png" className="w-full h-auto object-contain" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="https://www.theitdepot.com/images/headerScroll_new/mother%20board.png" className="w-full h-auto object-contain"/>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </>
    )
}