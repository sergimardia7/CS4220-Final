const PORT = 8888;

const app = express();

//app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Brewery Search App');
});

app.use('/search', searchRoutes);
app.use('/:id/details', searchRoutes);
app.use('/history', historyRoutes);

app.listen(PORT, async () => {
    await connect();
    console.log(`Server is listening on port ${PORT}`);
});

