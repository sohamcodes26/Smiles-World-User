/**
 * Pages Service - Business logic for page content operations
 */
const HomeContent = require('../../models/HomeSchema');
const AboutContent = require('../../models/AboutSchema');
const WomenTravelContent = require('../../models/WomenTravelSchema');
const GroupDepartureContent = require('../../models/GroupDepartureSchema');
const ContactContent = require('../../models/ContactSchema');
const DomesticContent = require('../../models/DomesticPageSchema');
const InternationalContent = require('../../models/InternationalPageSchema');

/**
 * Get home page content
 * @returns {Promise<Object>} - Home page content
 */
const getHomePageContent = async () => {
  let content = await HomeContent.findById('home_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'home_page',
      heroBanner: { imageUrl: '' },
    };
  }

  return content;
};

/**
 * Get about page content
 * @returns {Promise<Object>} - About page content
 */
const getAboutPageContent = async () => {
  let content = await AboutContent.findById('about_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'about_page',
      storyAndMission: {
        story: '',
        mission: { text: '' },
        profilePhoto: { imageUrl: '' }
      },
      ourMembers: { cards: [] },
      journeyInNumbers: { cards: [] },
    };
  }

  return content;
};

/**
 * Get women travel page content
 * @returns {Promise<Object>} - Women travel page content
 */
const getWomenTravelPageContent = async () => {
  let content = await WomenTravelContent.findById('women_travel_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'women_travel_page',
      heroBanner: { imageUrl: '' },
      whatOurSistersSay: { cards: [] },
    };
  }

  return content;
};

/**
 * Get group departures page content
 * @returns {Promise<Object>} - Group departures page content
 */
const getGroupDeparturesPageContent = async () => {
  let content = await GroupDepartureContent.findById('group_departures_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'group_departures_page',
      heroBanner: { imageUrl: '' }
    };
  }

  return content;
};

/**
 * Get contact page content
 * @returns {Promise<Object>} - Contact page content
 */
const getContactPageContent = async () => {
  let content = await ContactContent.findById('contact_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'contact_page',
      contactDetails: {
        phoneNumber: '',
        weekStart: '',
        weekEnd: '',
        dayStart: '',
        dayEnd: '',
        operatingHours: '',
        email: '',
        address: '',
        users: 0,
        communityRating: '',
      },
      faqSection: { faqs: [] },
      cancellationAndRefundPolicy: 'Policy not found.'
    };
  }

  return content;
};

/**
 * Get domestic page content
 * @returns {Promise<Object>} - Domestic page content
 */
const getDomesticPageContent = async () => {
  let content = await DomesticContent.findById('domestic_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'domestic_page',
      heroBanner: { imageUrl: '' },
    };
  }

  return content;
};

/**
 * Get international page content
 * @returns {Promise<Object>} - International page content
 */
const getInternationalPageContent = async () => {
  let content = await InternationalContent.findById('international_page')
    .select('-__v')
    .lean();

  if (!content) {
    content = {
      _id: 'international_page',
      heroBanner: { imageUrl: '' },
    };
  }

  return content;
};

/**
 * Get only the cancellation policy
 * @returns {Promise<string>} - The cancellation policy text
 */
const getCancellationPolicy = async () => {
    const contactPage = await ContactContent.findById('contact_page')
        .select('cancellationAndRefundPolicy -_id') // Fetches ONLY the policy field
        .lean();

    if (!contactPage || !contactPage.cancellationAndRefundPolicy) {
        return 'Cancellation and refund policy not found.';
    }

    return contactPage.cancellationAndRefundPolicy;
};


module.exports = {
  getHomePageContent,
  getAboutPageContent,
  getWomenTravelPageContent,
  getGroupDeparturesPageContent,
  getContactPageContent,
  getDomesticPageContent,
  getInternationalPageContent,
  getCancellationPolicy, // <-- Export the new function
};