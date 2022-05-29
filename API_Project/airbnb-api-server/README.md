# Airbnb모의외주 (서버 개발)

프로젝트 소개   
PPT : [에어비앤비_프로젝트.pptx](https://github.com/penclub79/Node/files/8792850/_.pptx)

**기간** : 21.05.22 ~ 05.29 (1주일 소요)   
**구성원** : 프로젝트 리더 2명, 클라이언트 담당 2명, 서버 개발 1명  
**사용 기술** :    
* Server : AWS, RDS 구축   
* OS/version : Ubuntu/Linux 18.04 LTS
* Language : JavaScript
* Framework : Node.JS, Express
* DB/Tool : MYSQL, DataGrip

**프로젝트 소개**
서비스 중인 Product App AirBnB를 참고하여 **웹 서버 구축, ERD 설계, API 설계, 배포** 과정을 소개합니다.

**기여도** : 기획(50%), 화면 개발(0%), 서버 개발(100%), 기타 문서 작업(80%)

---
### 1. Airbnb 기획서 작성 - 변경사항시 업데이트 예정
---

#### 1.1. dev 인스턴스 생성
* SSH - 키페어 적용
* Nginx
* npm / node
* 외부 접속 허용 (팀원:제이비)

#### 1.2. prod 인스턴스 생성
* SSH - 키페어 적용
* Nginx  
* npm / node
* 외부 접속 허용 (팀원:제이비)

#### 1.3. RDS (dev, prod) 생성

---
### 2. 개발 범위
---
![image](https://user-images.githubusercontent.com/40047360/170857473-c8b4cdb8-c6e2-4a8f-842a-e378cf710602.png)   
Comment : 1주일 개발 기간을 두고 핵심 기능만 고현하고자 기획하고 개발했습니다.

---
### 3. 시스템 구조
---
![image](https://user-images.githubusercontent.com/40047360/170857528-c2228c2c-1200-4e52-95f7-a9ad07b90795.png)   
Comment : Git을 이용하여 프론트 개발자와 소스코드를 관리했으며, Dev 서버에 개발을 하고 테스트 후 문제가 없다고 판단이 되면 Prod 서버로 배포할 계획으로 구성했습니다.

---
### 4. 서버 구성
---
![image](https://user-images.githubusercontent.com/40047360/170857618-6bbc408e-3690-498b-b413-afe51545729d.png)   
Comment : 가비안 호스팅을 이용하여 도메인을 구매하고 TXT레코드와 SSL을 적용하였습니다.

---
### 5. ERD 설계
---
![image](https://user-images.githubusercontent.com/40047360/170857665-76264f40-c79b-4f2d-8f07-e5d728cde7f6.png)   
Comment :    
1. 핵심 기능만 동작하기 위해 테이블과 컬럼의 수를 최소화했습니다.

2. 외래키를 쓰지 않고 Join으로만 참조하였습니다.

---
### 6. API 설계
---
![image](https://user-images.githubusercontent.com/40047360/170857861-2efc7dba-847c-4f27-bcae-e704d377f6f9.png)   
Comment : Restful API 설계로 32개의 API를 만들었습니다.   
1. Oauth인증은 구글 서비스만 개발하였습니다.

2. 또 다른 로그인 인증은 JWT인증 API를 이용할 수 있게 만들었습니다.

3. 삭제 Method는 DEL 방식을 사용하지 않고 PATCH를 사용하여 삭제를 비활성화/활성화로 나타냈습니다.