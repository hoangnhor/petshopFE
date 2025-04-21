import React from "react";

const FooterComponent = () => {
    return (
        <div
            style={{
                width: "100%", // Chiều rộng toàn màn hình
                background: "#fff", // Màu nền trắng
                padding: "20px 0", // Khoảng đệm trên dưới
                borderTop: "1px solid #ddd", // Đường viền trên
                marginTop: "20px", // Khoảng cách với nội dung phía trên
            }}
        >
            <div
                style={{
                    width: "1300px", // Container cố định 1300px, căn giữa
                    margin: "0 auto",
                    display: "flex", // Sử dụng flexbox để chia cột
                    justifyContent: "space-around", // Căn đều các cột
                    alignItems: "flex-start", // Căn trên cùng
                    gap: "20px", // Khoảng cách giữa các cột
                }}
            >
                {/* Cột 2: Bản đồ Google Maps */}
                <div>
                    <h3>Bản đồ</h3>
                    <iframe
                        title="Pet Store Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410426466!2d106.67525181062004!3d10.737997189364297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaS ho4buNYy BDw7RuZy buZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1745177879295!5m2!1svi!2s"
                        width="300"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Cột 3: Thông tin liên hệ */}
                <div>
                    <h3>Liên hệ</h3>
                    <p>
                        Email: <a href="mailto:contact@petstore.com">contact@petstore.com</a>
                    </p>
                    <p>
                        Hotline: <a href="tel:+0123456789">0123 456 789</a>
                    </p>
                    <p>
                        Facebook:{" "}
                        <a
                            href="https://facebook.com/petstore"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pet Store
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;