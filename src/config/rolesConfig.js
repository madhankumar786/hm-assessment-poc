const rolesConfig = {
    User: {
      canAccess: ['dashboard', 'about', 'contact','incidents'],
    },
    External: {
      canAccess: ['dashboard','about', 'contact'],
    },
  };
  
export default rolesConfig;
  