import { StyledFooter } from '@/styles/footer.styles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FooterComponent = () => {
  const router = useRouter()

  return (
    <StyledFooter>
      <div>
        <section>
          <h2>Sobre</h2>
          <nav>
            {/* <Link href="/">Quem somos</Link>
            <Link href="/">FAQ (Dúvidas frequentes)</Link>
            <Link href="/">Políticas e termos de uso</Link>
            <Link href="/">Entre em contato</Link> */}
          </nav>
        </section>

        <section>
          <h2>Marketing</h2>
          <nav>
            <Link
              href="https://api.whatsapp.com/send?phone=+55++5532999730864&text=Quero vender tibia coins"
              target="_blank"
            >
              Compramos suas Tibia Coins
            </Link>
          </nav>
        </section>

        <section>
          <h2>Social</h2>
          <nav>
            <Link
              href="https://www.instagram.com/thygas_coins/"
              target="_blank"
            >
              Instagram
            </Link>

            <Link
              href="https://api.whatsapp.com/send?phone=+55++5532999730864&text=Ol%C3%A1..."
              target="_blank"
            >
              Whatsapp
            </Link>
          </nav>
        </section>
      </div>
    </StyledFooter>
  )
}

export default FooterComponent
