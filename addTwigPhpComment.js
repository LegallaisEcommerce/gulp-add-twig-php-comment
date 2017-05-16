const through = require('through2')
const tag     = '{#<?php#}'

const addComment = twig => {
    if (!twig.includes(tag)) {
        return `${tag}\n\n${twig}`
    }

    return twig
}

const addTwigPhpComment = () => {

    return through.obj((file, enc, callback) => {

        if (file.isNull()) {
            return callback(null, file)
        }

        if (file.isBuffer()) {
            const twig     = file.contents.toString()
            file.contents = new Buffer(addComment(twig))
        }

        callback(null, file)

    })

}

module.exports = addTwigPhpComment
