import Link from 'next/link'
import { useAppContext } from '../context/state'
import { useRouter } from 'next/router'
import { TabNav } from '@radix-ui/themes'

export default function Navbar() {
  const { token, setToken, profile } = useAppContext()
  const router = useRouter()
  const { pathname } = useRouter()
  const isLoggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    router.push('/login')
  }

  return (
      <TabNav.Root justify="center" style={{ backgroundColor: "#C4E8F6" }} >
        {isLoggedIn ? (
          <>
          <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/projects"}>
          <Link href="/projects">All Projects</Link>
        </TabNav.Link>

        <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/projects/new"}>
          <Link href="/projects/new">Create Project</Link>
        </TabNav.Link>

        <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/profile"}>
          <Link href="/profile">Profile</Link>
        </TabNav.Link>

        <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/projectlikes"}>
          <Link href="/projectlikes">Favorites</Link>
        </TabNav.Link>

        <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === ""}>
        <Link href='/login' className="navbar-item" onClick={handleLogout}
          >
            Log Out
          </Link>
        </TabNav.Link>
          </>
        ) : (
          <>
          <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/register"}>
            <Link href="/register">Register</Link>
          </TabNav.Link>

          <TabNav.Link asChild style={{ padding: "15px" }} active={pathname === "/login"}>
            <Link href="/login">Log In</Link>
          </TabNav.Link>
          </>
        )}
      </TabNav.Root>
  )
}
