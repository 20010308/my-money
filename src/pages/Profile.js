import React from 'react';
import {BsFillTelephoneFill, BsArrowLeft} from 'react-icons/bs'
import {AiTwotoneMail} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const Profile = () => {
    return (
        <div className='bg-light'>
            <div className='container'>
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-4">
                        <div className='back'>
                            <Link to={'/home'} className='text-dark text-decoration-none'><BsArrowLeft/> <span className='ms-3'>Orqaga</span></Link>
                        </div>

                        <div className="profile bg-white">
                            <div className="w-100 d-flex justify-content-center">
                                <img src="./image/person.jfif" alt="Error"/>
                            </div>
                            <h5 className="mt-4 fw-bolder">Xolmuminov Umidjon</h5>
                            <h5 className='mb-4'>Company name</h5>
                            <p><BsFillTelephoneFill className='me-3'/> Tel: +998943990308</p>
                            <p><AiTwotoneMail className='me-3'/> Email: xolmuminovumidjon0@gmail.com</p>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="bg-white profile h-100">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, error, quidem. Ab alias aperiam asperiores autem culpa cumque delectus doloribus dolorum ea libero molestiae perferendis placeat tempora, tempore unde! Culpa delectus dolore et harum inventore, ipsum laudantium minima saepe voluptatem voluptatibus! Atque consequatur deleniti ipsum labore molestiae quae voluptatem! At dolor error nemo tempora? Amet, dolores error est maxime possimus quae quis sunt tempora. Ab accusamus accusantium, aliquid animi aut eius eos est ex expedita explicabo facilis illum impedit ipsam, labore modi nam non nostrum, perspiciatis possimus praesentium quas quia quisquam repellat repellendus sit veritatis voluptate. Blanditiis expedita, tempore. Ab aliquid aperiam assumenda aut blanditiis commodi cum deleniti dolorem dolorum eum, facere fugiat id magnam, maiores minima necessitatibus quibusdam quidem quis quo repudiandae sint tempore temporibus totam vero voluptatem. Atque culpa dignissimos ea error esse est expedita facilis, nisi obcaecati officiis pariatur porro quasi quidem rem repellat sunt vero voluptates?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;