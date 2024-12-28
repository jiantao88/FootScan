export default {
  common: {
    home: 'Home',
    scan: 'Scan',
    community: 'Community',
    dashboard: 'Dashboard',
    explore: 'Explore',
    profile: 'Profile',
    connect_wallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    upload: 'Upload',
    search: 'Search',
    about: 'About',
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  title: 'Food Scanner',
  subtitle: 'Scan food for detailed information',
  hero: {
    title: 'Food Safety',
    subtitle: 'Starts with Ingredients',
    description: 'Using AI + Web3 technology to intelligently analyze food ingredients and ensure food safety. Community-driven, making every food item transparent and trustworthy.',
    start_button: 'Start Analysis'
  },
  features: {
    title: 'Why Choose Us',
    subtitle: 'Smart Analysis, Safe and Reliable',
    items: {
      ai_analysis: {
        title: 'Smart Recognition',
        description: 'Automatically recognize ingredient labels and quickly extract text information'
      },
      blockchain: {
        title: 'Safety Analysis',
        description: 'AI analyzes ingredients and assesses potential risks'
      },
      community: {
        title: 'Community Governance',
        description: 'Users participate in evaluation and maintain food safety together'
      },
      realtime: {
        title: 'Data Transparency',
        description: 'Analysis results are stored on blockchain for data credibility'
      }
    }
  },
  analysis: {
    title: 'Popular Analysis',
    description: 'Discover the latest community-analyzed food ingredients and get safety assessment reports',
    status: {
      safe: 'Safe',
      warning: 'Warning',
      danger: 'Danger'
    },
    time: {
      hours_ago: '{{hours}} hours ago'
    },
    verifications: '{{count}} verifications',
    view_details: 'View Details',
    view_more: 'View More Analysis',
    cards: {
      card1: {
        title: 'Brand A Biscuits',
        ingredients: 'Main ingredients: flour, sugar, vegetable oil...'
      },
      card2: {
        title: 'Brand B Beverage',
        ingredients: 'Main ingredients: water, sugar, juice, preservatives...'
      },
      card3: {
        title: 'Brand C Snacks',
        ingredients: 'Main ingredients: corn, vegetable oil, seasonings...'
      }
    }
  },
  analyze: {
    not_found: 'Food item not found',
    verified: 'Verified',
    verifications: '({count})',
    ingredients: {
      title: 'Ingredients',
      not_available: 'No ingredient information available'
    },
    nutrition: {
      title: 'Nutrition Facts',
      serving_size: 'Serving Size',
      calories: 'Calories',
      protein: 'Protein',
      fat: 'Fat',
      carbs: 'Carbohydrates',
      sodium: 'Sodium',
      not_available: 'No nutrition information available'
    },
    analysis: {
      title: 'Analysis Results',
      safety_score: 'Safety Score',
      risk_level: {
        title: 'Risk Level',
        low: 'Low Risk',
        medium: 'Medium Risk',
        high: 'High Risk'
      },
      warnings: {
        title: 'Warnings',
        allergens: 'Allergens',
        additives: 'Additives',
        none: 'No risks detected'
      }
    },
    community: {
      title: 'Community Feedback',
      verified_count: 'Verification Count',
      comments: 'Comments',
      no_comments: 'No comments yet'
    },
    actions: {
      verify: 'Verify',
      comment: 'Comment',
      share: 'Share',
      report: 'Report'
    }
  },
  cta: {
    title: 'Join Us in Building a Food Safety Community',
    start_button: 'Start Analysis'
  },
  scan: {
    upload_title: 'Upload Food Image',
    upload_desc: 'Drop your image here or click to browse',
    analyzing: 'Analyzing...',
    results: {
      title: 'Analysis Results',
      overview: 'Overview',
      detailed: 'Detailed Analysis',
      community: 'Community Feedback',
      nutrition_score: 'Nutrition Score',
      nutrition_score_desc: 'Comprehensive score based on nutritional content',
      safety_index: 'Safety Index',
      safety_index_desc: 'Food safety comprehensive assessment',
      community_rating: 'Community Rating',
      community_rating_desc: 'Based on community user reviews',
      main_findings: 'Main Findings',
      no_harmful_additives: 'No harmful additives found',
      safe: 'Safe',
      safe_desc: 'This food has good safety',
      warning: 'Warning',
      warning_desc: 'This food contains ingredients that need attention',
      danger: 'Danger',
      danger_desc: 'This food contains potentially dangerous ingredients'
    },
    card: {
      view_details: 'View Details',
      participate: 'Participate',
      verified: 'Verified',
      pending: 'Pending',
      verification_count: '{{count}} verifications',
      rating: 'Rating',
      likes: 'Likes',
      analysis_time: 'Analysis Time',
      tags: {
        // Food Types
        carbonated: 'Carbonated',
        snack: 'Snack',
        instant: 'Instant',
        dairy: 'Dairy',
        meat: 'Meat',
        tea: 'Tea',
        
        // Ingredients
        sugar: 'Sugar',
        caffeine: 'Caffeine',
        fried: 'Fried',
        high_sodium: 'High Sodium',
        preservatives: 'Preservatives',
        protein: 'Protein',
        calcium: 'Calcium',
        additives: 'Additives',
        
        // Food Status
        ready_to_eat: 'Ready to Eat',
        
        // Safety Levels
        safe: 'Safe',
        warning: 'Warning',
        danger: 'Danger',
        
        // Other Tags
        verified: 'Verified',
        popular: 'Popular',
        new: 'New',
        organic: 'Organic',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        gluten_free: 'Gluten Free',
        dairy_free: 'Dairy Free',
        nut_free: 'Nut Free'
      }
    }
  },
  community: {
    title: 'Community',
    posts: 'Posts',
    create_post: 'Create Post',
    comments: 'Comments',
    share: 'Share',
    categories: {
      all: 'All',
      correction: 'Corrections & Verifications',
      education: 'Food Safety Education',
      recommendation: 'Product Reviews'
    },
    post: {
      create: {
        title: 'Create New Post',
        form: {
          title: 'Title',
          title_placeholder: 'Enter post title',
          content: 'Content',
          content_placeholder: 'Enter post content',
          category: 'Category',
          is_correction: 'This is a correction post',
          submit: 'Submit',
          cancel: 'Cancel'
        },
        success: 'Post created successfully!',
        error: 'Failed to create post, please try again',
        validation: 'Please fill in all required fields'
      },
      meta: {
        likes: 'Likes',
        comments: 'Comments',
        tags: 'Tags'
      },
      actions: {
        new_post: 'New Post',
        view_details: 'View Details'
      }
    },
    filters: {
      title: 'Filter',
      latest: 'Latest',
      popular: 'Popular',
      verified: 'Verified'
    }
  },
  profile: {
    tabs: {
      info: 'Profile Info',
      history: 'Upload History',
      contributions: 'Contributions',
      settings: 'Settings'
    },
    info: {
      title: 'Profile Information',
      wallet_address: 'Wallet Address',
      join_date: 'Join Date',
      bio: 'Bio',
      edit: 'Edit Profile'
    },
    history: {
      title: 'Upload History',
      no_uploads: 'No uploads yet',
      upload_time: 'Upload Time',
      analysis_result: 'Analysis Result',
      view_details: 'View Details'
    },
    contributions: {
      title: 'Contributions',
      badges: {
        title: 'Badges',
        no_badges: 'No badges yet'
      },
      votes: {
        title: 'Votes',
        upvotes: 'Upvotes',
        downvotes: 'Downvotes'
      },
      tokens: {
        title: 'FST Tokens',
        balance: 'Balance'
      },
      points: {
        title: 'Contribution Points',
        level: 'Level'
      }
    },
    settings: {
      title: 'Settings',
      language: {
        title: 'Language',
        chinese: '中文',
        english: 'English'
      },
      notifications: {
        title: 'Notifications',
        analysis_complete: 'Analysis Complete',
        community_updates: 'Community Updates',
        token_rewards: 'Token Rewards'
      },
      privacy: {
        title: 'Privacy',
        public_profile: 'Public Profile',
        show_history: 'Show Upload History',
        show_votes: 'Show Votes'
      },
      save: 'Save Settings',
      saved: 'Settings Saved'
    }
  },
  my_scans: 'My Scans',
  my_posts: 'My Posts',
  settings: 'Settings',
  errors: {
    upload_failed: 'Upload Failed',
    analysis_failed: 'Analysis Failed',
    please_try_again: 'Please try again later'
  },
  explore: {
    categories: {
      all: 'All',
      beverages: 'Beverages',
      snacks: 'Snacks',
      instant_food: 'Instant Food',
      frozen_food: 'Frozen Food',
      dairy: 'Dairy'
    },
    token: {
      title: 'Token Rewards',
      balance: 'Current Balance: {{amount}} FST',
      connect_wallet: 'Connect wallet to view balance',
      claim: {
        button: 'Claim 100 Tokens',
        loading: 'Claiming...',
        claimed: 'Claimed',
        success: 'Successfully claimed 100 FST tokens!',
        error: 'Failed to claim, please try again later',
        connect_first: 'Please connect wallet first'
      }
    },
    search: {
      placeholder: 'Search for food or users...',
      no_results: 'No results found'
    },
    sort: {
      latest: 'Latest',
      popular: 'Popular',
      title: 'Sort by'
    }
  },
  upload: {
    title: 'Analyze Food Ingredients',
    subtitle: 'Upload ingredient label image or enter text to get AI analysis report',
    dropzone: {
      title: 'Drop image here',
      or: 'or',
      browse: 'Browse files',
      hint: 'Supports JPG and PNG formats'
    },
    text_input: {
      title: 'Or enter ingredient text',
      placeholder: 'Enter ingredient text here...'
    },
    analysis: {
      start: 'Start Analysis',
      processing: 'Analyzing...',
      success: 'Analysis Complete',
      error: 'Analysis failed, please try again'
    }
  }
}
