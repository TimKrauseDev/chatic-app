const keys = (
    await import(`${ process.env.NODE_ENV === 'production' ? `./prod.js` : `./dev.js`}`)
).default;

export default keys