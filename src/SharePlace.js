class PlaceFinder {
    constructor() { // 생성자 함수
        const addressForm = document.querySelectorAll('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener("click", this.locateUserHandler);
        // addressForm.addEventListener("submit", this.findAddressHandler);
    }


    locateUserHandler() {
        // 사용자 위치 얻기
        if (!navigator.geolocation) {
            alert("현재 Geolocation 기능을 사용할수 없습니다. 보다 최신 버전의 브라우저를 이용하거나 주소를 직접 입력하세요. ");
            return;
        }
        // 현재 위치 얻기
        navigator.geolocation.getCurrentPosition(
            successResulut => {
                const coordinates = {
                    lat: successResulut.coords.latitude,
                    lng: successResulut.coords.longitude
                };
                console.log(coordinates);

            }, error => {
                // 위치를 찾지 못할때
                alert("위치를 찾을수 없습니다. 제대로된 주소를 입력하세요!")

            });


    }

    findAddressHandler() {

    }



}

const placeFinder = new PlaceFinder();