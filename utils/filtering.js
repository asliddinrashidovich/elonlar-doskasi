const filtering = (from, to, region) => {
  let filtering;
  // if exist all of them
  if (from && to && region) {
    filtering = {
      amount: { $gte: from, $lte: to },
      region,
    };
  }

  //   if exist region
  if (!from && !to && region) {
    filtering = {
      region,
    };
  }

  // from
  if (from && !to && !region) {
    filtering = {
      amount: {$gte: from}
    };
  }

  // to
  if (!from && to && !region) {
    filtering = {
      amount: {$lte: to}
    };
  }

  if (from && to && !region) {
    filtering = {
      amount: {$gte: from, $lte: to}
    };
  }
  if (from && !to && region) {
    filtering = {
      amount: {$gte: from},
      region
    };
  }
  if (!from && to && region) {
    filtering = {
      amount: {$lte: to},
      region
    };
  }

  return filtering
};

module.exports = filtering
