import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                    style={{height:'95vh'}}
                    className="d-block w-100"
                    src="https://compass-ssl.xbox.com/assets/0b/71/0b716849-0633-4d76-a40b-4424f2bb7eb5.jpg?n=SWBF2_gallery-0_1350x759_11.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    style={{height:'95vh'}}
                    className="d-block w-100"
                    src="https://compass-ssl.xbox.com/assets/8f/d7/8fd7e3c9-269b-4b7e-8ec5-6cc52533137b.jpg?n=SWBF2_gallery-0_1350x759_01.jpg"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item nterval={3000}>
                    <img
                    style={{height:'95vh'}}
                    className="d-block w-100"
                    src="https://compass-ssl.xbox.com/assets/e4/2e/e42ee411-caeb-41cf-8d65-024ac06e6d90.jpg?n=SWBF2_gallery-0_1350x759_08.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselComponent
