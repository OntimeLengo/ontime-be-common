module.exports = settings => {
  const limitRecords = settings.limitRecords || 20;
  const restrictionLimit = settings.restrictionLimit || [10, 20, 50, 100];
  const removedAllowValue = [1, 2];

  return params => {
    let page = parseInt(params.page) || 1;
    let limit = parseInt(params.limit) || limitRecords;
    let removed = parseInt(params.removed) || 1;

    if (restrictionLimit.indexOf(limit) < 0) {
      limit = limitRecords;
    }

    if (removedAllowValue.indexOf(removed) < 0) {
      removed = 1;
    }

    return {
      page: page,
      skip: (page - 1) * limit,
      limit: limit,
      removed: removed
    };
  };
};
