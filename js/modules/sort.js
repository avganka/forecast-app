export default function sort() {
    const sortBtns = document.querySelectorAll('[name="alphabet-sort"]');
    console.log(sortBtns);

    sortBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target && e.target.value == 'alphabet-sort') {

            } else {

            }
        });
    });



}