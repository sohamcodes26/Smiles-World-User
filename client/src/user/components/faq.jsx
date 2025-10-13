import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FAQ = ({ faqs = [], title = "❓ Frequently Asked Questions", subtitle = "Quick answers to common questions" }) => {
  const defaultFaqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 4-6 weeks in advance for domestic trips and 8-12 weeks for international travel to get the best rates and availability."
    },
    {
      question: "Are your women-only trips really safe?",
      answer: "Absolutely! Our women-only trips feature female guides, vetted accommodations, small group sizes, and 24/7 support specifically designed for women's safety."
    },
    {
      question: "Can you customize existing packages?",
      answer: "Yes! All our packages can be customized based on your preferences, budget, dates, and special requirements. Just let us know what you'd like to change."
    },
    {
      question: "What's included in package prices?",
      answer: "Package prices typically include accommodation, meals as specified, transportation, guided tours, and entry tickets. International flights are usually excluded."
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, we strongly recommend travel insurance and can help you choose the right coverage for your trip. We partner with leading insurance providers to offer comprehensive protection."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "Our cancellation policy varies by package and timing. Generally, we offer flexible cancellation options, especially for bookings made well in advance. Please check the specific terms for your package."
    }
  ];

  const faqsToDisplay = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* --- FIX: Added all-text-color class here --- */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 all-text-color">
            {title}
          </h2>
          {/* --- FIX: Added all-text-color class here --- */}
          <p className="text-lg md:text-xl text-gray-600 all-text-color">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqsToDisplay.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start">
                <Heart className="mr-2 text-purple-500 flex-shrink-0 mt-1" size={18} />
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;