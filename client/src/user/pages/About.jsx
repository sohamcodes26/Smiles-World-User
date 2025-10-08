import { useEffect } from "react";
import { motion } from "framer-motion";
import { User, Loader } from "lucide-react";
import logo from "../../assets/logo.ico";
import InfoCard from "../components/infoCard";
import { useAboutPage } from "../hooks/useAboutPage";

export default function About() {
    const { data: aboutData, isLoading, isError, error } = useAboutPage();

    useEffect(() => {
        if (isError) {
            console.error("Failed to load About Page data from API:", error);
        }
    }, [isError, error]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e7c1fa] to-[#b921ff]">
                <div className="text-center text-white">
                    <Loader className="w-16 h-16 animate-spin mx-auto mb-4" />
                    <p className="text-2xl font-semibold">Loading Page...</p>
                </div>
            </div>
        );
    }

    const fallbackData = {
        storyAndMission: {
            story: `hey hey I am Shweta Undre, founder of Smiles World. Though my degree says I am an engineer, my heart has always belonged to the world of travel.\n\nMy passion for exploring began in school—by the time I was in 10th standard, my father had already shown me almost the entire India. Those journeys left a mark on me forever. The thrill of discovering new cultures, the joy of tasting different cuisines, and the sheer magic of a sunrise or sunset—these experiences shaped my dreams.\n\nYet, I went on to complete my engineering degree and stepped into a corporate job. But deep inside, I always knew something was missing. That wasn’t the work that set my soul on fire.\n\nA break to become a mother gave me clarity. I pursued an MBA in Tourism and co-founded my first venture, Smiles Holidays. For 12 fulfilling years, we served over 10,000 happy travelers, earning their trust and love.\n\nWith the same vision and deeper conviction, I founded Smiles World—a brand built on passion, trust, and the promise of creating unforgettable travel experiences that stay with you long after the journey ends.`,
            mission: {
                text: "To make travel accessible, safe, and joyful for everyone, especially empowering women to explore the world with confidence.",
            },
            profilePhoto: {
                imageUrl: ''
            }
        },
        ourMembers: {
            cards: [
                { name: "Sarah Adventure", designation: "Founder & Lead Explorer", information: "15+ years of travel experience across 40+ countries.", imageUrl: null },
                { name: "Maya Wanderer", designation: "Women's Travel Specialist", information: "Expert in women-only travel programs and safety protocols.", imageUrl: null },
                { name: "Arjun Guide", designation: "Cultural Experience Director", information: "Local heritage expert with deep knowledge of Indian culture.", imageUrl: null }
            ],
        },
        journeyInNumbers: {
            cards: [
                { value: "5000+" },
                { value: "150+" },
                { value: "500+" },
                { value: "98%" }
            ],
        },
    };

    const content = !isError && aboutData ? aboutData : fallbackData;
    const profileImageUrl = content.storyAndMission?.profilePhoto?.imageUrl;
    const journeyStats = [
        { label: "Happy Travelers" },
        { label: "Destinations" },
        { label: "Successful Trips" },
        { label: "Satisfaction Rate" },
    ];
    const memberIcons = ["🧭", "🌸", "🎭"];

    return (
        <div className="bg-[#dcf0ff] -mt-16">
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                            About Smiles World
                        </h1>
                        <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                            We believe travel is more than just visiting places – it's about creating connections, discovering cultures, and collecting smiles along the way.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="aspect-square bg-gradient-to-br from-violet-400 to-purple-500 rounded-3xl shadow-lg shadow-purple-500/20 flex flex-col items-center justify-center text-center p-8">
                                
                                {/* --- FIX: WRAPPED IN A REACT FRAGMENT --- */}
                                <>
                                    {profileImageUrl ? (
                                        <img 
                                            src={profileImageUrl} 
                                            alt="Shweta Undre, Founder" 
                                            className="w-100 h-70 object-cover rounded-xl border-4 border-white shadow-lg"
                                        />
                                    ) : (
                                        <User className="w-28 h-28 text-purple-800/50" strokeWidth={1} />
                                    )}

                                    <p className="mt-4 text-xl font-medium text-[white]">
                                        Shweta Undre
                                    </p>
                                    <p className="text-sm text-[#e7e7e7]">
                                        Founder, Smiles World
                                    </p>
                                </>
                                {/* --- END OF FIX --- */}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3"
                        >
                            <h2 className="text-4xl font-bold text-foreground mb-8">
                                A Note From Our Founder ✍️
                            </h2>
                            <div className="space-y-5 text-muted-foreground leading-relaxed text-justify">
                                <p className="text-muted-foreground leading-relaxed text-justify whitespace-pre-line">
                                    {content.storyAndMission.story}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto mb-20"
                    >
                        <div className="cloud-card p-10 text-center bg-white rounded-3xl shadow-lg shadow-purple-500/20">
                            <div className="mb-5 flex justify-center">
                                <img src={logo} alt="Smiles World Logo" className="w-16 h-16" />
                            </div>
                            <h3 className="text-4xl font-bold text-black mb-4">
                                Our Mission
                            </h3>
                            <p className="text-xl text-muted-foreground">
                                {content.storyAndMission.mission.text}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Our Values ✨
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            The principles that guide every journey we create
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { emoji: "🛡️", title: "Safety First", description: "Your security and well-being are our top priority in every destination we visit." },
                            { emoji: "💖", title: "Authentic Experiences", description: "We focus on genuine cultural connections and meaningful travel experiences." },
                            { emoji: "👥", title: "Inclusive Travel", description: "Creating welcoming spaces for travelers of all backgrounds and comfort levels." },
                            { emoji: "⭐", title: "Excellence", description: "Committed to delivering exceptional service and unforgettable memories." },
                            { emoji: "🌱", title: "Sustainable Tourism", description: "Supporting local communities while preserving the beauty of our destinations." },
                            { emoji: "🤝", title: "Trust & Transparency", description: "Honest pricing, clear communication, and reliable service you can depend on." },
                        ].map((value, index) => (
                            <InfoCard key={index} delay={index * 0.1} icon={value.emoji} title={value.title} description={<p>{value.description}</p>} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Meet Our Team 👥
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Passionate travelers dedicated to making your journey extraordinary
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.ourMembers.cards.map((member, index) => (
                            <InfoCard
                                key={member.memberId || index}
                                delay={index * 0.2}
                                icon={
                                    member.imageUrl ? (
                                        <img src={member.imageUrl} alt={member.name} className="w-20 h-20 object-cover rounded-full mx-auto" />
                                    ) : (
                                        memberIcons[index] || "👤"
                                    )
                                }
                                title={member.name}
                                description={
                                    <>
                                        <p className="text-purple-700 font-medium mb-4 text-sm">
                                            {member.designation}
                                        </p>
                                        <p className="text-xs">{member.information}</p>
                                    </>
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Our Journey in Numbers 📊
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {journeyStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-black mb-1">
                                    {content.journeyInNumbers.cards[index]?.value}
                                </div>
                                <div className="text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}