import { logoutAccount } from "@/lib/actions/user.actions"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Footer = ( { user, type = 'desktop' } : FooterProps ) => {
    const router = useRouter();
    const handleLogOut = async () => {
        const loggedout =await logoutAccount();
        if(loggedout){
            router.push("/sign-in")
        }
    }
  return (
    <footer className="footer">
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className="text-xl font-bold text-stone-200">
                {user?.name[0]}
            </p>
        </div>

        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className="text-14 text-stone-100 font-semibold">
               {user?.name} 
            </h1>
            <p className="text-14 truncate font-semibold text-slate-100">
                {user?.email}
            </p>
        </div>

        <div className="footer_image" onClick={handleLogOut}>
            <Image src="icons/logout.svg" fill alt="Logout button" />
        </div>
    </footer>
  )
}

export default Footer
