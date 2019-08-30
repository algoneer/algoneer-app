export default {
    // assume all links are the same
    identity: ({ baseValue }) => x => baseValue + x,
    // logistic is inverse of logit
    logit: ({ baseValue }) => x => 1 / (1 + Math.exp(-(baseValue + x))),
};
