export class Map {
    constructor(coords) {
        //this.coordinates = coords;
        this.render(coords);

    }
    render(coordinates) {
        if (!google) {
            alert("구글맵을 로드할수 없습니다. 다음에 다시 시도해주세요!")
            return;
        }

        const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 16

        });

        new google.maps.Marker({
            position: coordinates,
            map: map
        });
    }
}