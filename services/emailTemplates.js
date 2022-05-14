const keys = require('../config/keys');

module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3 style="font-size: 36px">I'd like your input!</h3>
                    <p style="font-size: 20px">Please answer the following question:</p>
                    <p style="font-size: 20px">${survey.body}</p>
                    <div style="margin-top: 5px">
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">
                            <button>Yes</button>
                        </a>
                    </div>
                    <div style="margin-bottom: 5px">
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">
                            <button>No</button>
                        </a>
                    </div>
                    <p>If you have additional feedback, you may reply to this email directly.</p>
                </div>
            </body>
        </html>
    `;
};