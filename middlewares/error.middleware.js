
export const errorMiddleware = (err, req, res, next) => {
    try {
        console.error(err);

        if (err.name === 'CastError'){
            return res.status(404).json({ status: 404, message: 'Resource not found' });
        }
        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            return res.status(400).json({ status: 400, message });
        }
        if (err.code && err.code === 11000){
            const field = Object.keys(err.keyValue);
            const message = `Duplicate value for field: ${field}`;
            return res.status(400).json({ status: 400, message });
        }

        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(status).json({ status, message });

    } catch (error){
        next(error);
    }
}