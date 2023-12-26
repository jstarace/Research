import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, LinkedInIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center">
        <h1 className={title()}>Welcome!!!</h1>
        <br />
        <h2 className={subtitle()}>This is all very much in development.</h2>
        <h3 className={subtitle({ class: "mt-4" })}>
          Here is where I&apos;ll host my work and collaborate with others on
          current and future research.
        </h3>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.linkedin}
        >
          <LinkedInIcon size={20} />
          LinkedIn
        </Link>
      </div>
    </section>
  );
}
