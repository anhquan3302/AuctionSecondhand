import React from 'react'
import Header2 from '../../components/Header2'
import FooterBK from '../../components/FooterBK'

export default function Contact() {
    return (
        <>
            <Header2 />
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
                        <div className="flex gap-x-8 clear-left md:mb-16 mb-10">
                            {/* Bên trái */}
                            <div className="flex-[7] flex flex-col items-center md:items-start justify-center md:mb-0 mb-4 md:pr-8">
                                <h2 className="text-blue-700 font-manrope text-3xl md:text-4xl font-semibold leading-snug mb-4 text-center md:text-left">
                                    Thông tin liên lạc
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed mb-5 text-center md:text-left max-w-2xl mx-auto">
                                    Chúng tôi luôn sẵn sàng hỗ trợ bạn trong mọi thắc mắc liên quan đến sản phẩm đấu giá, quy trình đấu giá hoặc bất kỳ yêu cầu nào khác. Đội ngũ của chúng tôi cam kết mang đến cho bạn trải nghiệm đấu giá tuyệt vời và minh bạch nhất. Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua thông tin dưới đây.
                                </p>
                            </div>

                            {/* Bên phải */}
                            <div className="flex-[0.3] flex flex-col justify-center border-l-2 md:border-blue-600 border-gray-200 px-8 py-6">
                                <div className="mb-6">
                                    <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                                        Địa chỉ liên lạc
                                    </h6>
                                    <h3 className="text-blue-700 text-lg md:text-xl font-semibold leading-8 md:text-start text-center">
                                        anhquanpro332002@gmail.com
                                    </h3>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                                        Số điện thoại
                                    </h6>
                                    <h3 className="text-blue-700 text-lg md:text-xl font-semibold leading-8 md:text-start text-center">
                                        0937534654
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://th.bing.com/th/id/OIP.Ep6KHw44mUi_gPhxfdXvlAHaE7?pid=ImgDet&w=474&h=315&rs=1" alt="Hà Nội image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Đồng hồ</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://sm.pcmag.com/t/pcmag_au/review/s/sony-cyber/sony-cyber-shot-dsc-hx90v_txxe.1200.jpg" alt="TP Hồ Chí Minh image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Máy ảnh</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://nhadepso.com/wp-content/uploads/2023/02/top-50-hinh-nen-vintage-dep-sang-trong-bac-nhat-cho-may-tinh_2.jpg" alt="Đà Nẵng image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Tranh ảnh</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://th.bing.com/th/id/OIP.Bvgys3nelbLxvohtPW4i9gHaHa?rs=1&pid=ImgDetMain" alt="Cần Thơ image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Bình cổ</h5>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://th.bing.com/th/id/OIP.NDt0nyzlsLL5vajqC0bU-gAAAA?rs=1&pid=ImgDetMain" alt="Hà Nội image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Bàn ghế</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://chuyennha24h.net/wp-content/uploads/2021/03/tai-che-quan-ao-cu-7.jpg" alt="TP Hồ Chí Minh image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Quần áo</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://eficienciacomex.com.br/wp-content/uploads/2015/03/cover-finale-1600x1600.jpg" alt="Đà Nẵng image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">album nhạc</h5>
                            </div>
                        </div>
                        <div className="h-96 relative flex justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-t from-blue-200/50 to-blue-200/50" />
                            <img src="https://th.bing.com/th/id/R.d0def9479fd8dcb55b1015675252494f?rik=CS%2bxTstRKYcWRw&pid=ImgRaw&r=0" alt="Cần Thơ image" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 mb-6 text-center px-6">
                                <h5 className="text-white text-lg font-semibold leading-7 mb-2">Thể thao</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

           
        </>
    )
}
