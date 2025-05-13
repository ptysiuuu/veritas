import { Outlet } from "react-router"


export default function RootLayout() {
    return (
        <div>
            <div>
                <h1>Veritas</h1>
            </div>
            <main className="flex-grow">
                <div className="h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}