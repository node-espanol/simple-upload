const uploadCtr = (req, res) => {
    try {
        const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000';
        console.log(req.file);
        res.send({ url: `${publicUrl}/${req.file.filename}` })

    } catch (e) {
        res.send({ error: e }, 500)
    }
}

module.exports = { uploadCtr }