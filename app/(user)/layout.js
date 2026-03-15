import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function UserLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="content " >
                {children}
            </main>
            <Footer />

        </>
    )
}