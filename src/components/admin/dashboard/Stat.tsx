import { Box, Grid2, Typography } from "@mui/material";

interface StatProps {
    title: string;
    value: string;
    icon: any;
}

const Stat: React.FC<StatProps> = ({ title, value, icon }) => {
    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box sx={{ background: '#ffff', borderRadius: '0 20px 20px 0px', padding:'30px 10px' ,borderLeft: '8px solid #E6A800', boxShadow: '0 0 10px #e8e8e8', height: '100%' }}>
                <Grid2 container spacing={1}>
                    <Grid2 size={9}>
                        <Box>
                            <Typography className="Lato" sx={{ color: '#E6A800', fontWeight: 'bold', fontSize: '3vh' }}>{title}</Typography>
                            <Typography className="Lato" marginTop={2} sx={{ fontWeight: 'bold', fontSize: '2.5vh' }}>{value}</Typography>
                        </Box>
                    </Grid2>
                    <Grid2 size={3}>
                        {icon}
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    );
};

export default Stat;