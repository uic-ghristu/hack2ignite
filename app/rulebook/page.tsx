"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import Snowfall from "react-snowfall";
import { cn } from "@/lib/utils";
import { pixelFont } from "@/app/page";

const rules = [
    { title: "1. Problem Statement Release", rules: ["The official problem statements will be released on the Hack 2 Ignite website and sent to registered teams via email.", "The online round will officially begin at 9:00 AM sharp on 16 September.", "The 48-hour development period will begin immediately at 9:00 AM on 16 September."] },
    { title: "2. Development Window", rules: ["Teams must develop their solution within the official 48-hour online development window.", "The development window will end at 9:00 AM on 18 September.", "All major development work on the submitted prototype must be completed within this 48-hour period.", "Teams are responsible for managing their time and ensuring that their solution is submitted before the deadline."] },
    { title: "3. Development Verification", rules: ["Teams must use GitHub for development and maintain a clear commit history throughout the hackathon.", "GitHub repositories and commit history may be reviewed by the organizers or judging panel to verify that the project was developed within the allotted time.", "Projects or significant portions of projects developed before the official start of the hackathon may be disqualified.", "Exceeding the allotted 48-hour development period for substantial development work may result in disqualification.", "Teams should ensure that their GitHub repository accurately reflects their development process during the hackathon."] },
    { title: "4. Online Submission", rules: ["Every team must submit its completed prototype within the specified submission deadline.", "Each team must submit a presentation (PPT) explaining their solution, approach, implementation, and key features.", "A demo video is optional but strongly recommended.", "Teams must ensure that all submitted links, files, repositories, and supporting materials are accessible to the organizers.", "Incomplete or late submissions may be considered ineligible for evaluation."] },
    { title: "5. Originality & Ownership", rules: ["All submitted work must be the original work of the participating team.", "Plagiarism, direct copying, or submission of another person's or team's work is strictly prohibited.", "Teams may use publicly available libraries, APIs, frameworks, and development tools, provided their actual solution and implementation comply with the hackathon rules.", "Any attempt to misrepresent previously developed work as work completed during the hackathon may result in disqualification."] },
    { title: "6. Offline Qualification", rules: ["The top 30 teams from the online round will qualify for the on-campus offline round.", "Selected teams must report to the campus at the time and location communicated by the organizers.", "Teams qualifying for the offline round must be physically present on campus as instructed.", "A Rs.500 per-team participation fee will be applicable to teams shortlisted for the offline round."] },
    { title: "7. Offline Development Challenge", rules: ["Shortlisted teams must continue working on their existing prototype during the offline round.", "Teams will receive a new feature, requirement, or challenge that must be integrated into their existing prototype.", "Integration of the assigned new feature is mandatory.", "Teams must complete the assigned enhancement within the time limit specified by the organizers.", "The updated prototype should demonstrate meaningful improvement over the version submitted during the online round."] },
    { title: "8. Final Pitch", rules: ["After the offline development session, teams must present their updated solution to the judging panel.", "The pitch must explain the problem, proposed solution, implementation, key features, and improvements made during the offline round.", "Teams should be prepared to demonstrate their working prototype to the judges.", "The judging panel may ask questions regarding the technical implementation, decisions, impact, and future scope of the solution.", "Teams must follow the presentation time limits and instructions provided by the organizers."] },
    { title: "9. Team Rules", rules: ["Each team must consist of 2-4 members.", "Each participant may be a member of only one team.", "Inter-college and inter-specialization teams are permitted.", "Teams must ensure that all registered members actively participate in the hackathon."] },
    { title: "10. Compliance & Disqualification", rules: ["Teams must follow the problem statement, submission requirements, deadlines, and instructions provided by the organizers.", "Any attempt to manipulate GitHub history, submission timestamps, or other verification mechanisms may result in disqualification.", "Violation of hackathon rules may result in immediate disqualification.", "The organizers reserve the right to verify submissions and request additional information regarding a team's development process.", "The decision of the judging panel and organizers regarding eligibility, rule violations, and final results will be final and binding."] },
];

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return <motion.div className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-[#90C5EF]" style={{ scaleX }} />;
}

function RuleSection({ section }: { section: (typeof rules)[number] }) {
    const reduceMotion = useReducedMotion();
    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 py-10"
        >
            <h2 className={cn(pixelFont.className, "mb-5 text-2xl text-white sm:text-3xl")}>
                {section.title}
            </h2>
            <ul className="space-y-3">
                {section.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/60 sm:text-base">
                        <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#90C5EF]" />
                        {rule}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function RuleBook() {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-white">
            <ScrollProgress />
            <Snowfall snowflakeCount={18} speed={[0, 0.4]} wind={[0, 0.3]} radius={[0.5, 1.5]} />
            <nav className="relative z-10 flex items-center justify-between px-6 pt-8 sm:px-10 md:px-20">
                <Link href="/" className="group flex items-center gap-3">
                    <img src="https://res.cloudinary.com/e6c908eq/image/upload/v1787411962/main-logo.png" width={100} height={48} alt="Hack 2 Ignite" className="pointer-events-none" />

                </Link>
                <span className={cn(pixelFont.className, "text-sm tracking-widest text-white/30 uppercase")}>hack2ignite</span>
            </nav>
            <header className="px-6 pb-8 pt-12 sm:px-10 md:px-20">
                <div className="mx-auto max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                        <h1 className={cn(pixelFont.className, "text-6xl leading-none sm:text-7xl md:text-8xl")}>Rulebook</h1>
                        <p className="mt-4 text-sm text-white/40 sm:text-base">Read carefully. Violations may result in disqualification.</p>
                    </motion.div>
                    <motion.div
                        className="mt-10 h-px w-full bg-gradient-to-r from-[#90C5EF]/40 via-white/10 to-transparent"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </header>
            <main className="px-6 pb-28 sm:px-10 md:px-20">
                <div className="mx-auto max-w-3xl">
                    {rules.map((section) => (
                        <RuleSection key={section.title} section={section} />
                    ))}
                    <div className="border-t border-white/10 pt-12 text-center">
                        <p className="text-sm text-white/30">
                            Questions?{" "}
                            <a href="mailto:uic.ghristu@gmail.com" className="text-[#90C5EF]/60 underline-offset-4 transition-colors hover:text-[#90C5EF] hover:underline">
                                uic.ghristu@gmail.com
                            </a>
                        </p>
                        <Link href="/" className={cn(pixelFont.className, "mt-8 inline-block text-2xl text-white/20 transition-colors hover:text-white/50")}>
                            hack2ignite
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
