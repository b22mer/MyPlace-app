class PlaceFinder {
    constructor() { // 생성자 함수
        const addressForm = document.querySelectorAll('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener("click", this.locateUserHandler);
        addressForm.addEventListener("submit", this.findAddressHandler);
    }


    locateUserHandler() {

    }

    findAddressHandler() {

    }


}