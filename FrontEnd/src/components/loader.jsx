import './loader.css';

var showLoader = () => {
    document.getElementById('loader').style.display = 'block';
}

var hideLoader = () => {
    document.getElementById('loader').style.display = 'none';
}

var Loader = () => {
    return (
        <div id="loader">
        </div>
    );
}

export {showLoader, hideLoader, Loader};