import { Modal } from './UI/Modal'
// 모달 모듈 추가
import { Map } from './UI/Map'
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location'

class PlaceFinder {
    constructor() { // 생성자 함수
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
        this.shareBtn.addEventListener("click", this.sharePlaceHandler);
        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    }

    sharePlaceHandler() {
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.select();

        // 브라우저가 클립보드 기능이 적용되는지 확인
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(sharedLinkInputElement.value)
            .then(() => {
                //성공
                alert("클립보드에 복사를 했습니다.")
            }).catch(err => {
                console.log(err);
                sharedLinkInputElement.select();
            });
    }


    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }

        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;

    }

    locateUserHandler() {
        // 사용자 위치 얻기
        if (!navigator.geolocation) {
            alert("현재 Geolocation 기능을 사용할수 없습니다. 보다 최신 버전의 브라우저를 이용하거나 주소를 직접 입력하세요. ");
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading location - 기다려 주세요!');
        modal.show();
        // 현재 위치 얻기
        navigator.geolocation.getCurrentPosition(
            async successResulut => {

                const coordinates = {
                    lat: successResulut.coords.latitude,
                    lng: successResulut.coords.longitude
                };

                const address = await getAddressFromCoords(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address);
            }, error => {
                modal.hide();
                // 위치를 찾지 못할때
                alert("위치를 찾을수 없습니다. 제대로된 주소를 입력하세요!")
            });


    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('이용할수 없는 주소입니다. 다시 시도해주세요!');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading location - 기다려 주세요!');
        modal.show();
        // async, await 함수는 promise를 반환해!
        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates, address);
        } catch (err) {
            alert(err.message);
        }
        modal.hide();



    }



}

const placeFinder = new PlaceFinder();