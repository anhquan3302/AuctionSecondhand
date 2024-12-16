import React from "react";
const FooterBK = () => {
  return (
    <footer className="px-10 bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD] divide-y dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-row justify-around py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3 flex justify-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600">
              
            </div>
            <span className="self-center text-2xl font-semibold">
              Đấu giá Việt
            </span>
          </a>
        </div>
        <div className="grid grid-cols-4 contents text-sm gap-x-36 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Sản phẩm
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Tính năng
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Tích hợp
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Báo giá
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Công ty
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-900">Dành cho lập trình viên</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  API công cộng
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Tài liệu hướng dẫn
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Hướng dẫn sử dụng
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-900">Mạng xã hội</div>
            <div className="flex justify-start space-x-3">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Facebook"
                className="flex items-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path
                    d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                className="flex items-center p-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path
                    d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Instagram"
                className="flex items-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                >
                  <path
                    d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.709 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.396 2.176 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.709-0.084 2.865-0.349 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.781 1.849-2.833 0.396-1.020 0.661-2.176 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.709-0.349-2.865-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.781-1.443-2.833-1.849-1.020-0.396-2.176-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zm0 19.086c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10.243c-2.357 0-4.26 1.903-4.26 4.26 0 2.356 1.903 4.26 4.26 4.26 2.357 0 4.26-1.903 4.26-4.26 0-2.356-1.903-4.26-4.26-4.26zm6.24-2.405c-0.618 0-1.118-0.5-1.118-1.118s0.5-1.118 1.118-1.118c0.618 0 1.118 0.5 1.118 1.118s-0.5 1.118-1.118 1.118z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};
export default FooterBK;
