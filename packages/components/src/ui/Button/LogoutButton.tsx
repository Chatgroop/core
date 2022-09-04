export default function LoginButton() {
    return (
        <div>
            <a href="/api/auth/logout" className="text-white font-semibold font-poppins transition rounded-2xl py-3 px-8 bg-gradient-to-bl from-pink-600 to-indigo-500 hover:shadow-xl">
                Log Out
            </a>
        </div>
    )
}