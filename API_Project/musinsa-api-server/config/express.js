const express = require('express');

const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    // require('../src/app/routes/testRoute')(app);

    //유저 테스트
    // require('../src/app/User/userRoute')(app);

    // 회원
    require('../src/app/Customer/customerRoute')(app);
    // require('../src/app/routes/userRoute')(app);

    // 상품
    require('../src/app/Product/productRoute')(app);

    // 주문
    require('../src/app/Order/orderRoute')(app);
    // require('../src/app/Board/boardRoute')(app);

    // 배송
    require('../src/app/Delivery/deliveryRoute')(app);

    // 리뷰
    require('../src/app/Review/reviewRoute')(app);

    // 좋아요
    require('../src/app/Like/likeRoute')(app);

    // 쿠폰
    require('../src/app/Coupon/couponRoute')(app);

    // 멤버
    require('../src/app/MemberBenefit/memberBenefitRoute')(app);

    // 장바구니
    require('../src/app/Basket/basketRoute')(app);

    // 태그
    require('../src/app/Tag/tagRoute')(app);

    // 카테고리
    require('../src/app/Category/categoryRoute')(app);

    // 브랜드
    require('../src/app/Brand/brandRoute')(app);

    // 배송지
    require('../src/app/Recipient/recipientRoute')(app);

    return app;
};