import React, { useState } from 'react';
import clean from "../assets/clean.svg"
import check from "../assets/calendar-check.svg"
import checkOut from "../assets/check-out.svg"
import fresh from "../assets/freshener.svg"
import service from "../assets/service.svg"
import nigeria from "../assets/nigeria1.svg"
import rate from "../assets/rateStar.svg"
import cancel from "../assets/cancel.svg"
import smoking from "../assets/smoking.svg"
import party from "../assets/party.svg"
import card from "../assets/card.svg"
import master from "../assets/master.svg"
import visa from "../assets/visa.svg"




const WhatWeOffer = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // Sample reviews data - you can expand this
    const reviews = [
        {
            id: 1,
            name: "Hannah",
            location: "Abuja, Nigeria",
            rating: "7.56",
            date: "February, 2025",
            shortText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iste sequi temporibus commodi reiciendis error ab enim similique cupiditate...",
            fullText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iste sequi temporibus commodi reiciendis error ab enim similique cupiditate, expedita nulla odio quaerat voluptatibus explicabo soluta eos saepe voluptate illo repudiandae blanditiis fugit alias suscipit sapiente. Delectus quia perspiciatis nostrum at nesciunt iste ab! Quos at sit, earum iste nulla voluptates fuga temporibus cupiditate alias eligendi rerum eius, reiciendis possimus facilis aliquid minus ducimus. Reiciendis, vero, omnis iusto id ipsam repudiandae, delectus voluptas accusantium quia at eos ad facilis alias saepe eius esse consequatur enim error voluptatum rem ducimus a veritatis similique. Molestias voluptates quasi nostrum ratione ut nemo! Sequi. Additional content here to make it longer and more comprehensive for the modal display."
        },
        {
            id: 2,
            name: "James",
            location: "Lagos, Nigeria",
            rating: "8.21",
            date: "January, 2025",
            shortText: "Exceptional service and amazing experience. The cleanliness was top-notch and the staff were very professional...",
            fullText: "Exceptional service and amazing experience. The cleanliness was top-notch and the staff were very professional. I was impressed by the attention to detail and the seamless check-in process. The serenity of the place made my stay truly memorable. Would definitely recommend to anyone looking for quality accommodation. The facilities exceeded my expectations and the location was perfect for my business needs."
        },
        {
            id: 3,
            name: "Sarah",
            location: "Port Harcourt, Nigeria",
            rating: "9.12",
            date: "December, 2024",
            shortText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described...",
            fullText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described in the listing. The host was incredibly responsive and helpful throughout my stay. The property was spotless and well-maintained. I particularly enjoyed the peaceful environment which allowed me to relax completely. This place truly stands out from other accommodations I've stayed at."
        },
        {
            id: 4,
            name: "Segun",
            location: "Jos, Nigeria",
            rating: "5.12",
            date: "December, 2024",
            shortText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described...",
            fullText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described in the listing. The host was incredibly responsive and helpful throughout my stay. The property was spotless and well-maintained. I particularly enjoyed the peaceful environment which allowed me to relax completely. This place truly stands out from other accommodations I've stayed at."
        },
        {
            id: 5,
            name: "Grace",
            location: "Lagos, Nigeria",
            rating: "7.12",
            date: "December, 2024",
            shortText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described...",
            fullText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described in the listing. The host was incredibly responsive and helpful throughout my stay. The property was spotless and well-maintained. I particularly enjoyed the peaceful environment which allowed me to relax completely. This place truly stands out from other accommodations I've stayed at."
        },
        {
            id: 6,
            name: "Peter",
            location: "Oyo, Nigeria",
            rating: "8.12",
            date: "December, 2024",
            shortText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described...",
            fullText: "Outstanding experience from start to finish. The ambiance was perfect and everything was exactly as described in the listing. The host was incredibly responsive and helpful throughout my stay. The property was spotless and well-maintained. I particularly enjoyed the peaceful environment which allowed me to relax completely. This place truly stands out from other accommodations I've stayed at."
        }
    ];

    const [selectedReview, setSelectedReview] = useState(null);

    // Function to get background color for profile initials
    const getProfileColor = (name) => {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const openModal = (review) => {
        setSelectedReview(review);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedReview(null);
    };

    // Get cards per view based on screen size
    const getCardsPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3; // Desktop
            if (window.innerWidth >= 768) return 2;  // Tablet
            return 1; // Mobile
        }
        return 3; // Default for SSR
    };

    const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

    // Update cards per view on window resize
    React.useEffect(() => {
        const handleResize = () => {
            setCardsPerView(getCardsPerView());
            setCurrentCardIndex(0); // Reset to start when changing view
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollLeft = () => {
        setCurrentCardIndex(prev => Math.max(0, prev - 1));
    };

    const scrollRight = () => {
        setCurrentCardIndex(prev => Math.min(reviews.length - cardsPerView, prev + 1));
    };

    // Check if we can scroll left or right
    const canScrollLeft = currentCardIndex > 0;
    const canScrollRight = currentCardIndex < reviews.length - cardsPerView;

    return (
        <>
            <h1 className="text-xl md:text-2xl mb-3 font-bold">What Makes It Stand Out</h1>

            {/* What Makes It Stand Out Section - Horizontal scroll on mobile/tablet */}
            <div className="overflow-x-auto">
                <div className="flex items-center min-w-max lg:min-w-0">
                    <div className="border-r px-2 md:px-4 flex-shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img src={clean} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
                            <p className="text-xs whitespace-nowrap">Cleanliness</p>
                        </div>
                        <h3 className="font-bold mt-3 md:mt-6 text-lg md:text-xl">5.0</h3>
                    </div>

                    <div className="border-r px-2 md:px-4 flex-shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img src={check} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
                            <p className="text-xs whitespace-nowrap">Check-In</p>
                        </div>
                        <h3 className="font-bold mt-3 md:mt-6 text-lg md:text-xl">4.8</h3>
                    </div>

                    <div className="border-r px-2 md:px-4 flex-shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img src={fresh} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
                            <p className="text-xs whitespace-nowrap">Serenity</p>
                        </div>
                        <h3 className="font-bold mt-3 md:mt-6 text-lg md:text-xl">5.0</h3>
                    </div>

                    <div className="px-2 md:px-4 flex-shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <img src={service} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
                            <p className="text-xs whitespace-nowrap">Service</p>
                        </div>
                        <h3 className="font-bold mt-3 md:mt-6 text-lg md:text-xl">5.0</h3>
                    </div>
                </div>
            </div>

            <div>
                <hr className="my-[2rem]" />
                <h1 className="text-xl md:text-2xl mb-3 font-bold">Guests Who Stayed Here Said</h1>

                {/* Scrollable Cards Container */}
                <div className="relative flex items-center gap-2 md:gap-4">
                    {/* Left Navigation Button - Only show if can scroll left */}
                    {canScrollLeft && (
                        <button 
                            onClick={scrollLeft}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 md:p-2 transition-colors flex-shrink-0"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Cards Container */}
                    <div className="overflow-hidden flex-1">
                        <div 
                            className="flex transition-transform duration-300 ease-in-out gap-3 md:gap-4" 
                            style={{ transform: `translateX(-${currentCardIndex * (100/cardsPerView)}%)` }}
                        >
                            {reviews.map((review) => (
                                <div key={review.id} className="w-full lg:w-1/3 md:w-1/2 flex-shrink-0">
                                    <div className="border rounded-xl p-3 md:p-4 h-full">
                                        <div className="flex gap-[5px] justify-between items-center">
                                            <div className="flex items-center gap-[5px] min-w-0">
                                                <p className={`flex items-center justify-center text-white w-6 h-6 md:w-8 md:h-8 rounded-full ${getProfileColor(review.name)} text-xs md:text-sm flex-shrink-0`}>
                                                    {review.name.charAt(0)}
                                                </p>
                                                <p className="text-xs border-r-2 pr-2 border-black font-bold truncate">{review.name}</p>
                                                <div className="text-xs flex items-center min-w-0">
                                                    <img src={nigeria} alt="" className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                                    <span className="ml-1 md:ml-2 truncate">{review.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center flex-shrink-0">
                                                <p className="font-bold text-xs md:text-sm">{review.rating}</p>
                                                <img src={rate} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
                                            </div>
                                        </div>

                                        <div className="text-xs mt-3 md:mt-4">
                                            <p className="line-clamp-3 md:line-clamp-none">{review.shortText}</p>
                                            
                                            <button 
                                                onClick={() => openModal(review)}
                                                className="text-blue-500 hover:text-blue-700 mt-2 font-medium"
                                            >
                                                Read more
                                            </button>

                                            <div className="font-semibold mt-3">
                                                <p>{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Navigation Button - Only show if can scroll right */}
                    {canScrollRight && (
                        <button 
                            onClick={scrollRight}
                            className="border hover:bg-gray-300 rounded-full p-1 md:p-2 transition-colors flex-shrink-0"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <hr className="my-[2rem]" />

            <div className="">
                <h1 className="text-xl md:text-2xl mb-3 font-bold">More Information</h1>

                {/* More Information Section - Horizontal scroll on all devices */}
                <div className='overflow-x-auto'>
                    <div className='flex text-xs items-stretch min-w-max'>
                        <div className='border-r px-2 flex-1 min-w-[200px] md:min-w-[250px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={check} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Check-In</p>
                            </div>

                            <div className="min-h-[60px]">
                                <p className='font-semibold mb-1'>
                                    From 12:00AM to 2:00PM
                                </p>

                                <p className="text-xs leading-tight">
                                    You'll need to let the property know in advance what time you'll arrive.
                                </p>
                            </div>
                        </div>

                        <div className='border-r px-2 flex-1 min-w-[150px] md:min-w-[200px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={checkOut} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Check-Out</p>
                            </div>

                            <div className="min-h-[60px]">
                                <p className='font-semibold mb-1'>By 12:00AM</p>
                                <p className="text-xs leading-tight"></p>
                            </div>
                        </div>

                        <div className='border-r px-2 flex-1 min-w-[250px] md:min-w-[300px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={cancel} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Cancellation/Repayment Policy</p>
                            </div>

                            <div className="min-h-[60px]">
                                <p className="text-xs leading-tight">
                                    Cancellation and repayment policies depend on the accommodation type. <span className='underline'>Enter your stay </span>dates to check the terms.
                                </p>
                            </div>
                        </div>

                        <div className='border-r px-2 flex-1 min-w-[150px] md:min-w-[200px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={smoking} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Smoking</p>
                            </div>

                            <div className="min-h-[60px]">
                                <p className="text-xs leading-tight">
                                    Smoking is highly prohibited
                                </p>
                            </div>
                        </div>

                        <div className='border-r px-2 flex-1 min-w-[150px] md:min-w-[200px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={party} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Parties</p>
                            </div>

                            <div className="min-h-[60px]">
                                <p className="text-xs leading-tight">
                                    Parties are not allowed
                                </p>
                            </div>
                        </div>

                        <div className='px-2 flex-1 min-w-[200px] md:min-w-[250px]'>
                            <div className='gap-1 text-xs mb-2 flex items-center'> 
                                <img src={check} alt="" className="flex-shrink-0 w-4 h-4" />
                                <p>Accepted Payment Methods</p>
                            </div>

                            <div className='flex items-center gap-2 min-h-[60px]'>
                                <img src={master} alt="" className="flex-shrink-0 w-[4rem] h-[4rem]" />
                                <img src={visa} alt="" className="flex-shrink-0 w-[4rem] h-[4rem]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <p className={`flex items-center justify-center text-white w-8 h-8 md:w-10 md:h-10 rounded-full ${getProfileColor(selectedReview.name)} text-sm md:text-lg`}>
                                        {selectedReview.name.charAt(0)}
                                    </p>
                                    <div>
                                        <p className="font-bold text-base md:text-lg">{selectedReview.name}</p>
                                        <div className="flex items-center text-xs md:text-sm text-gray-600">
                                            <img src={nigeria} alt="" className="w-3 h-3 md:w-4 md:h-4" />
                                            <span className="ml-1">{selectedReview.location}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="font-bold text-lg md:text-xl">{selectedReview.rating}</p>
                                        <img src={rate} alt="" className="mx-auto w-4 h-4 md:w-auto md:h-auto" />
                                    </div>
                                    
                                    <button 
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                <p>{selectedReview.fullText}</p>
                                
                                <div className="mt-4 md:mt-6 pt-4 border-t">
                                    <p className="text-gray-500 font-semibold">{selectedReview.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WhatWeOffer;