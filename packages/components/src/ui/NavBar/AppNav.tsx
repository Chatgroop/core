import LogoutButton from '../Button/LogoutButton';
import DarkButton from '../Button/DarkButton';

export default function Nav() {
    return (
    <nav className="flex justify-between bg-gray-200 dark:bg-gray-800">
        <div className="my-auto px-8 lg:px-16 py-4">
            <img src="https://i.imgur.com/ikbyXpF.png" className="h-12" />
        </div>
        <div className="my-auto px-8 lg:px-16 py-4">
            <DarkButton />
        </div>
        <div className="my-auto px-8 lg:px-16 py-4">
             
            <LogoutButton />
        </div>
    </nav>
    )
}