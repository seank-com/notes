module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: [
            {
                title: "Experiment #1",
                description: "Lorem ipsum doler fetus beetus columbre interagum..."
            },
            {
                title: "Experiment #2",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "http://2.bp.blogspot.com/-XriP7T_ao-8/T9yq50zHY-I/AAAAAAAAAJw/Npgw6LtRYks/s1600/experiment.png"
            },
            {
                title: "Experiment #3",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "http://toysforgirlsonline.com/wp-content/pictures/Science-Experiment-Kit-Best-Gifts-For-10-Year-Old-Girls-11-Boys-9-Age-8-Projects-01-ee.jpg"
            },
            {
                title: "Experiment #4",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "https://www.innovations-report.de/upload_waf/electronic-wave_627025.jpg"
            },
            {
                title: "Experiment #5",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "https://handsonaswegrow.com/wp-content/uploads/2018/04/Learn-Play-Imagine-Balloon-Experiment-250x250.jpg"
            },
            {
                title: "Experiment #6",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "https://i2.wp.com/www.klingereducational.com/wp-content/uploads/2017/07/Experiment-Free-Fall-115-V-5060-Hz.jpg?resize=250%2C250&ssl=1"
            },
            {
                title: "Experiment #7",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "http://ivyschemistryproject.weebly.com/uploads/5/2/8/7/52873023/949746587.jpg?250"
            },
            {
                title: "Experiment #8",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "https://www.selectscience.net/images/articles/7135_RA19305co-Hei-StarFish.jpg.ashx?width=250"
            },
            {
                title: "Experiment #9",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "http://www.isaactech.com/images/Science%20Education/Kits/Physical%20Science/LA82_large.jpg"
            },
            {
                title: "Experiment #10",
                description: "Lorem ipsum doler fetus beetus columbre interagum...",
                thumbnail: "https://phoenix.kidsoutandabout.com/sites/default/files/u76981/Elijas-Diaper-Experiment-2_0.png"
            }
        ]
    };
    context.done();
};