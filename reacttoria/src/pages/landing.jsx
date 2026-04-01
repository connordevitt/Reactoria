import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const PUBLIC = process.env.PUBLIC_URL || "";

const heroBgStyle = (position, size) => ({
  backgroundImage: `url(${PUBLIC}/images/wrigley3.jpg)`,
  backgroundPosition: position,
  backgroundSize: size,
  backgroundRepeat: "no-repeat",
});

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 850, once: true, offset: 48 });
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 text-stone-100 font-chicago">
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-dark-950 md:hidden"
          style={heroBgStyle("47% center", "auto 150%")}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-dark-950 hidden md:block"
          style={heroBgStyle("15% center", "auto 120%")}
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-950/95 via-dark-900/55 to-dark-950/90"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/80"
          aria-hidden
        />
        <div
          className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,220,160,0.07),transparent_55%)]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cubsred-600 to-transparent opacity-90"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-12 pt-28 sm:px-8 sm:pt-32 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p
              className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-cubs-400 opacity-0 animate-landing-fade-up [animation-delay:80ms]"
            >
              Reactoria
            </p>
            <h1
              className="mt-4 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl opacity-0 animate-landing-fade-up [animation-delay:180ms]"
            >
              Night
              <span className="block text-cubs-400">at the yard</span>
            </h1>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-dark-300 sm:text-lg opacity-0 animate-landing-fade-up [animation-delay:320ms]"
            >
              Live MLB standings with a clean, fan-first layout. Track every
              division, follow your club, and never lose the thread of the race.
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 animate-landing-fade-up [animation-delay:460ms]"
            >
              <button
                type="button"
                onClick={() => navigate("/leaguestandings")}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-gradient-to-b from-cubs-500 to-cubs-700 px-8 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-white shadow-[0_0_40px_-8px_rgba(26,79,212,0.55)] transition hover:shadow-[0_0_56px_-4px_rgba(26,79,212,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cubs-300 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
              >
                <span className="relative z-10">View standings</span>
                <span
                  className="absolute inset-0 -translate-x-full bg-white/20 transition duration-500 group-hover:translate-x-0"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center justify-center rounded-sm border border-dark-500/50 bg-dark-950/40 px-8 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-dark-200 backdrop-blur-sm transition hover:border-cubs-500/40 hover:text-cubs-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-400"
              >
                Why this app
              </button>
            </div>
          </div>

          <div
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-dark-600/30 pt-8 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-dark-400 sm:max-w-2xl sm:grid-cols-3 sm:gap-10 opacity-0 animate-landing-fade-in [animation-delay:620ms]"
          >
            <div>
              <span className="block text-2xl tracking-normal text-cubs-400">
                30
              </span>
              <span className="mt-1 block">Teams</span>
            </div>
            <div>
              <span className="block text-2xl tracking-normal text-cubs-400">
                6
              </span>
              <span className="mt-1 block">Divisions</span>
            </div>
            <div>
              <span className="block text-2xl tracking-normal text-cubs-400">
                2
              </span>
              <span className="mt-1 block">Leagues</span>
            </div>
          </div>
        </div>
      </section>

      <main id="about" className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-600/40 to-transparent"
          aria-hidden
        />

        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div
              className="lg:col-span-5"
              data-aos="fade-up"
            >
              <h2 className="font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl">
                Built for
                <span className="block text-cubs-400">the long season</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-dark-400">
                Reactoria keeps standings readable on your phone or desktop. No
                clutter, no noise. Check in between innings or deep in
                a pennant chase.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              <article
                className="group relative overflow-hidden rounded-lg border border-dark-600/60 bg-gradient-to-br from-dark-800 to-dark-900 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition hover:border-cubs-600/40"
                data-aos="fade-up"
                data-aos-delay="80"
              >
                <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cubs-400/80">
                  01
                </div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-white">
                  League view
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-400">
                  American and National leagues at a glance. Sort the story of
                  the season your way.
                </p>
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cubs-500/10 blur-2xl transition group-hover:bg-cubs-400/15"
                  aria-hidden
                />
              </article>

              <article
                className="group relative overflow-hidden rounded-lg border border-dark-600/60 bg-gradient-to-br from-dark-800 to-dark-900 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition hover:border-cubs-600/40 sm:translate-y-6"
                data-aos="fade-up"
                data-aos-delay="160"
              >
                <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cubs-400/80">
                  02
                </div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-white">
                  Your team
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-400">
                  Drill into any franchise: wins, losses, percentage, and the
                  context that matters.
                </p>
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cubs-500/10 blur-2xl transition group-hover:bg-cubs-400/15"
                  aria-hidden
                />
              </article>

              <article
                className="group relative overflow-hidden rounded-lg border border-cubsred-600/30 bg-gradient-to-br from-[#1a0f10] to-dark-900 p-7 sm:col-span-2"
                data-aos="fade-up"
                data-aos-delay="240"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cubsred-400/90">
                      Spotlight
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-white">
                      Always current
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-dark-400">
                      We pull fresh standings so your hot take is backed by real
                      numbers, whether you bleed blue or rep another city.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/leaguestandings")}
                    className="shrink-0 self-start rounded-sm border border-cubs-500/50 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-cubs-400 transition hover:bg-cubs-600/15 sm:self-center"
                  >
                    Go to standings →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-dark-700/80 bg-dark-950 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left sm:px-8">
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} Reactoria. MLB standings tracker.
          </p>
          <a
            href="https://github.com/connordevitt"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm font-semibold uppercase tracking-wider text-cubs-400 transition hover:text-cubs-300"
          >
            Connor Devitt
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
