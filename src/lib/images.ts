// Pexels HD images - free to use (Pexels license)
// Using CDN URLs with high quality parameters

const px = (id: number, w = 1260, h = 750) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&dpr=2`;

export const images = {
  // Homepage
  heroLawyer: px(5668858), // Professional woman lawyer at desk
  whyLawyer: px(5669619), // Person thinking/confused about legal matters
  aboutPreview: px(5668882), // Two lawyers in discussion
  
  // Attorney headshots
  attorney1: px(3756679, 400, 400), // Professional woman
  attorney2: px(3727464, 400, 400), // Professional woman 2
  attorney3: px(3785079, 400, 400), // Professional woman 3

  // Practice areas
  trafficAccident: px(5249231), // Car accident / traffic
  workplaceInjury: px(8159, 1260, 750), // Construction worker with hard hat
  medicalMalpractice: px(4386467), // Medical/surgery scene
  occupationalDisease: px(3825539), // Chemical/industrial exposure
  sportsRecreation: px(848618), // Sports/skiing
  childrensInjury: px(296301), // Children at playground
  productLiability: px(3825517), // Defective product / consumer safety
  businessOwner: px(3760067), // Business professional at desk
  businessOwnerWork: px(5673488), // Person working at computer
  businessOwnerSuccess: px(3760069), // Confident professional

  // Costs page
  costsFinancial: px(4386370), // Legal documents and money

  // About page
  teamPhoto: px(3184418), // Diverse professional team

  // Costs CTA / general
  consultation: px(5668772), // Legal consultation meeting
};

export default images;
