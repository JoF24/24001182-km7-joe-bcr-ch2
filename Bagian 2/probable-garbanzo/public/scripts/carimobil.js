const search_form = document.getElementById("form-search");
const carContent = document.getElementById("search-content");

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.card-wrapper');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    form.addEventListener('focusin', function() {
        overlay.style.display = 'block';
    });
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });
    search_form.addEventListener("submit", (e)=>{
        overlay.style.display = 'none';
    })
    form.addEventListener('focusout', function(e) {
        if (!form.contains(document.activeElement)) {
            overlay.style.display = 'none';
        }
    });
});

function susun_isi(car){
    const carContent = `
    <div class="col-md-4">
        <div class="card" style="width: 20vw;">
            <div class="card-body">
                <img src="${car.image}" alt="" class="img-car mb-5">
                <h6 class="card-subtitle mb-2 text-body-secondary">${car.manufacture}/${car.model}</h6>
                <h5 class="card-title">Rp. ${car.rentPerDay} / hari</h5>
                <p class="card-text">${car.description}</p>
                <div class="d-flex mt-2">
                    <img src="gambar/fi_users.png" alt="" style="width: 1.5vw; margin-right: 1vw;">
                    <p class="card-text">${car.capacity} Orang</p>
                </div>
                <div class="d-flex mt-2">
                    <img src="gambar/fi_settings.png" alt="" style="width: 1.5vw; margin-right: 1vw;">
                    <p class="card-text">${car.transmission}</p>
                </div>
                <div class="d-flex mt-2">
                    <img src="gambar/fi_calendar.png" alt="" style="width: 1.5vw; margin-right: 1vw;">
                    <p class="card-text">Tahun ${car.year}</p>
                </div>
                <button class="btn text-white btn-pilih mt-4">Pilih Mobil</button>
            </div>
        </div>
    </div>
    `
    carContentHtml += carContent;
}

search_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    carContentHtml = "";
    const tipe_driver = document.getElementById("driverType").value;
    const tanggal = document.getElementById("tanggal").value;
    const jam = document.getElementById("jam").value;
    const jumlahPenupang = document.getElementById("jumlahPenumpang").value;

    async function cetakhasil() {
        const mobil = await getCarData();
        console.log(mobil);
        mobil.map((car)=>{
            const carAvailableDate = car.availableAt.split('T')[0];
            if(tanggal == carAvailableDate && jumlahPenupang <= car.capacity){
                susun_isi(car);
            }
        });
        carContent.innerHTML = "<h1> Loading....</h1>";
        setTimeout(()=>{
            if(carContentHtml == ""){
                carContent.innerHTML = "<h1>Mobil Yang Anda Cari Tidak Tersedia......</h1>"
            }else{
                carContent.innerHTML = carContentHtml;
            };
        }, 3000);
        
    }
    cetakhasil();
    
})

function generateRandomDate() {
    const today = new Date();
    const tujuh_hari = new Date();
    tujuh_hari.setDate(today.getDate() + 7);

    return new Date(today.getTime() + Math.random() * (tujuh_hari.getTime() - today.getTime()));
}

const getCarData = async () => {
    const response = await fetch("data/cars.json");
    const data = await response.json();

    data.forEach(car => {
        car.availableAt = generateRandomDate().toISOString();
    });

    return data;
};