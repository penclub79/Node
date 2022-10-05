module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    USER_CREATE_SUCCESS : { "isSuccess": true, "code": 1001, "message":"회원가입 성공" },
    LOGIN_SUCCESS : { "isSuccess": true, "code": 1002, "message":"로그인 성공" },
    USER_MODIFY_SUCCESS : { "isSuccess": true, "code": 1003, "message":"유저정보 수정 성공" },
    PRODUCT_REGISTER_SUCCESS : { "isSuccess": true, "code": 1004, "message":"상품등록 성공" },
    BASKET_REGISTER_SUCCESS : { "isSuccess": true, "code": 1005, "message":"장바구니등록 성공" },
    BASKET_BUYCHECK_SUCCESS : { "isSuccess": true, "code": 1006, "message":"장바구니 구매 체크 성공" },
    BASKET_STATUS_DELETE : { "isSuccess": true, "code": 1006, "message":"장바구니 삭제 성공" },
    BASKET_IDX_EXIST : { "isSuccess": true, "code": 1006, "message":"해당 장바구니가 없습니다." },
    BASKET_STATUS_EMPTY : { "isSuccess": true, "code": 1006, "message":"장바구니 status를 입력하세요." },
    BASKET_STATUS_NOT_VALUE : { "isSuccess": true, "code": 1006, "message":"DELETE만 입력 가능합니다." },
    BASKET_REDUNDANT_STATUS_DELETE : { "isSuccess": true, "code": 1020, "message":"이미 해당 장바구니 삭제를 완료했습니다." },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    // SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    // SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    // SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_USERID_EMPTY : { "isSuccess": false, "code": 2000, "message": "아이디를 입력해주세요." },
    SIGNUP_USERID_LENGTH : { "isSuccess": false, "code": 2001, "message": "아이디는 5 ~ 11자리로 입력해주세요." },
    SIGNUP_USERID_SPECIAL_PATTEN : { "isSuccess": false, "code": 2002, "message": "특수문자는 포함되지 않습니다." },
    SIGNUP_USERID_NOT_NUM : { "isSuccess": false, "code": 2003, "message": "문자와 숫자를 포함하여 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 8~20자리를 입력해주세요." },
    SIGNUP_PASSWORD_INCLUDE : { "isSuccess": false, "code": 2006, "message":"비밀번호는 숫자,영문,특수문자를 포함하여 입력해주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2007, "message":"이름을 입력 해주세요." },
    SIGNUP_NAME_NOT_INCLUDE_NUM : { "isSuccess": false, "code": 2008, "message":"숫자는 잘못된 이름 입력입니다." },
    SIGNUP_NAME_LENGTH : { "isSuccess": false,"code": 2009,"message":"이름은 최대 20자리를 입력해주세요." },
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2010, "message":"이메일을 입력해주세요." },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2011, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2012, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PHONENUM_EMPTY : { "isSuccess": false,"code": 2013,"message":"전화번호를 입력해주세요." },
    SIGNUP_PHONENUM_NOT_FORM : { "isSuccess": false,"code": 2014,"message":"전화번호 형식이 맞지 않습니다." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false,"code": 2015,"message":"닉네임을 입력해주세요." },
    SIGNUP_RECIPIENT_EMPTY : { "isSuccess": false,"code": 2016,"message":"배송지가 존재하지 않습니다. 배송지를 등록해 주세요." },
    SIGNUP_RECIPIENT_NOT_EXIST : { "isSuccess": false,"code": 2017,"message":"해당 배송지는 없습니다. 다른 배송지를 선택해 주세요." },
    SIGNUP_HEIGHT_NOT_INCLUDE_STR : { "isSuccess": false,"code": 2018,"message":"키는 숫자로 입력해주세요." },
    SIGNUP_WEIGHT_NOT_INCLUDE_STR : { "isSuccess": false,"code": 2019,"message":"몸무게는 숫자로 입력해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2020,"message":"닉네임은 최대 10자리입니다." },

    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2015, "message": "비밀번호를 입력 해주세요." },

    // user
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2050, "message": "아이디를 입력해주세요." },
    USER_USERID_NOT_NUM : { "isSuccess": false, "code": 2051, "message": "문자와 숫자를 포함하여 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2052, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2053, "message": "이메일을 입력해주세요." },
    USER_EMAIL_LENGTH : { "isSuccess": false, "code": 2054, "message": "이메일은 30자리 미만으로 입력해주세요." },
    USER_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2055, "message":"이메일을 형식을 정확하게 입력해주세요." },
    // USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2017, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2056, "message": "유저 아이디 값을 확인해주세요." },
    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2058, "message": "회원 상태값을 입력해주세요" },
    USER_STATUS_NOT_FORM : { "isSuccess": false, "code": 2058, "message": "LOCK,DELETE,ACTIVE 중 입력하세요." },

    // Response error
    SIGNUP_REDUNDANT_USERID : { "isSuccess": false, "code": 3000, "message":"중복된 ID입니다." },
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_USERID_NOT_EXIST : { "isSuccess": false, "code": 3050, "message": "해당 회원이 존재하지 않습니다." },
    SIGNIN_USERID_EMPTY : { "isSuccess": false, "code": 3051, "message": "아이디를 입력해주세요." },
    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3052, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3053, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3054, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3055, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},

    //product
    PRODUCT_VALUE_EMPTY : { "isSuccess": false, "code": 5000, "message": "상품명을 입력해주세요." },
    PRODUCT_VALUE_NOT_NUM : { "isSuccess": false, "code": 5001, "message": "상품명에 숫자가 들어 갈수 없습니다." },
    PRODUCT_ARTICLE_NUM_EMPTY : { "isSuccess": false, "code": 5002, "message": "상품코드를 입력해주세요." },
    PRODUCT_ARTICLE_NOT_CHAR : { "isSuccess": false, "code": 5003, "message": "상품코드에 숫자만 입력해주세요." },
    PRODUCT_PRICE_EMPTY : { "isSuccess": false, "code": 5004, "message": "가격을 입력해주세요." },
    PRODUCT_PRICE_NOT_CHAR : { "isSuccess": false, "code": 5005, "message": "가격은 숫자만 입력해주세요." },
    PRODUCT_GENDER_EMPTY : { "isSuccess": false, "code": 5006, "message": "성별을 입력해 주세요." },
    PRODUCT_GENDER_ERROR_TYPE : { "isSuccess": false, "code": 5007, "message": "M, F, W로 입력해 주세요." },
    PRODUCT_COLOR_EMPTY : { "isSuccess": false, "code": 5008, "message": "컬러를 입력해 주세요." },
    PRODUCT_QUANTITY_EMPTY : { "isSuccess": false, "code": 5009, "message": "수량을 입력해 주세요." },
    PRODUCT_SALESRATE_EMPTY : { "isSuccess": false, "code": 5010, "message": "상품 할인을 입력해 주세요." },
    PRODUCT_CATEGORY_EMPTY : { "isSuccess": false, "code": 5011, "message": "카테고리를 입력해 주세요." },

    PRODUCT_NOT_PRODUCT : { "isSuccess": false, "code": 5005, "message": "해당상품은 없습니다." },
    PRODUCT_NOT_BRAND : { "isSuccess": false, "code": 5006, "message": "해당브랜드는 없습니다." },
    PRODUCT_NOT_TAG : { "isSuccess": false, "code": 5007, "message": "해당태그는 없습니다." },
    PRODUCT_REDUNDANT_TAG : { "isSuccess": false, "code": 5008, "message": "중복된 태그명입니다." },

    //order
    ORDER_SIZE_EMPTY : { "isSuccess": false, "code": 5504, "message": "사이즈를 입력해 주세요." },
    ORDER_SIZE_SHOES_EXIST : { "isSuccess": false, "code": 5505, "message": "신발 사이즈는 숫자만 입력 가능합니다." },
    ORDER_SIZE_SHOES_NUM_EXIST : { "isSuccess": false, "code": 5506, "message": "신발 사이즈는 200 ~ 400까지 입력 가능합니다." },
    ORDER_SIZE_ETC_NOT_NUM : { "isSuccess": false, "code": 5507, "message": "해당 사이즈는 숫자로 입력할 수 없습니다." },
    ORDER_SIZE_ETC_EXIST : { "isSuccess": false, "code": 5508, "message": "XL, L, M, S 사이즈로 입력 가능합니다." },
    ORDER_NUM_NOT_STRING : { "isSuccess": false, "code": 5509, "message": "수량에는 숫자만 입력 가능합니다." },
    ORDER_NUM_RANGE_FAIL : { "isSuccess": false, "code": 5510, "message": "주문 수량은 1 ~ 99개까지 가능합니다." },
    ORDER_MESSAGE_EMPTY : { "isSuccess": false, "code": 5511, "message": "주문 메세지를 입력해주세요." },
    ORDER_USER_COUPON_EXIST : { "isSuccess": false, "code": 5512, "message": "해당 유저의 쿠폰이 없습니다." },
    ORDER_COUPON_NOT_USE : { "isSuccess": false, "code": 5513, "message": "해당 상품에 사용할 수 없는 쿠폰입니다." },
    ORDER_USER_POINT_FAIL : { "isSuccess": false, "code": 5514, "message": "포인트가 부족합니다." },
    ORDER_USER_RESERVE_FAIL : { "isSuccess": false, "code": 5515, "message": "적립금 액수가 부족합니다." },

    //review
    REVIEW_TYPE_NOT_EXIST : { "isSuccess": false, "code": 5800, "message": "D, S, P 중 하나를 입력하세요." },
    REVIEW_GENDERTYPE_NOT_EXIST : { "isSuccess": false, "code": 5801, "message": "M, W 중 하나를 입력하세요." },

    //delivery
    DELIVERY_STATUS_EMPTY : { "isSuccess": false, "code": 6000, "message": "배송 상태값을 입력해주세요." },
    DELIVERY_IDX_EMPTY : { "isSuccess": false, "code": 6001, "message": "배송idx를 입력해주세요." },
    DELIVERY_PRODUCT_NOT_EXIST : { "isSuccess": false, "code": 6002, "message": "구매한 상품이 아닙니다." },

    //coupon
    COUPON_REDUNDANT_NAME : { "isSuccess": false, "code": 7000, "message": "중복된 쿠폰명입니다." },

    //tag
    TAG_NAME_EMPTY : {"isSuccess": false, "code": 8000, "message": "태그명을 입력해주세요."},
    TAG_IDX_EMPTY : {"isSuccess": false, "code": 8001, "message": "태그idx를 입력해주세요."},

    //category
    CATEGORY_NAME_EMPTY : {"isSuccess": false, "code": 9000, "message": "카테고리명을 입력해주세요."},
    CATEGORY_IDX_EMPTY : {"isSuccess": false, "code": 9001, "message": "카테고리Idx를 입력해주세요."},

    //recipient
    RECIPIENT_IDX_EMPTY : {"isSuccess": false, "code": 9500, "message": "배송지Idx를 입력해주세요."},
    RECIPIENT_USER_NOT_FIND_VALUE : {"isSuccess": false, "code": 9501, "message": "해당 유저의 배송지가 없습니다."},

    //brand
    BRAND_VALUE_EMPTY : {"isSuccess": false, "code": 10000, "message": "브랜드명을 입력해주세요."},


}
