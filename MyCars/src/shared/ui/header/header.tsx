import './header.css'
import logo from './images/cyhv.png'

const Header: React.FC = () => {
    return (
        <div className='main-header'>
            <img src={logo} className='header-logo'/>
            <div className='header-menu'>
                <div className='header-location'>
                    <svg width='12' height='12' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M8 0C4.13401 0 1 3.13401 1 7C1 12 8 16 8 16C8 16 15 12 15 7C15 3.13401 11.866 0 8 0ZM8 9.5C6.61929 9.5 5.5 8.38071 5.5 7C5.5 5.61929 6.61929 4.5 8 4.5C9.38071 4.5 10.5 5.61929 10.5 7C10.5 8.38071 9.38071 9.5 8 9.5Z' fill='currentColor'/>
                    </svg>
                    <a>Санкт-Петербург</a>
                    </div>
                <div className='header-products'>
                    <a>Автомобили</a>
                    <a>Спецтехника</a>
                    <a>Мотоциклы</a>
                    <a>Запчасти</a>
                    <a>Отзывы</a>
                    <a>Каталог</a>
                    <a>Шины</a>
                    <a>Ещё</a>
                </div>
                <div className='heade-announcement'>
                    <div className='heade-announcement-button'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                            <path fill-rule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z' clip-rule='evenodd' />
                        </svg>
                        <span className='full-text'>Подать объявление</span>
                        <span className='short-text'>Продать</span>
                    </div>
                </div>
                <div className='header-authorization'>
                    <a>
                        <span className='full-text'>Вход и регистрация</span>
                        <span className='short-text'>Вход</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header;