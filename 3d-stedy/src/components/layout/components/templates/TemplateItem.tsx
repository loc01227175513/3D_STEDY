import theme from '@/themes';
import { KitchenTemplateEntity } from '@/types/model';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

interface TemplateItemProps {
  index: number;
  template: KitchenTemplateEntity;
  onSelectTemplate: (item: KitchenTemplateEntity) => void;
}

export default function TemplateItem({
  index,
  template,
  onSelectTemplate,
}: TemplateItemProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <>
      {index != 0 && isMobile && <Divider />}
      <Grid
        size={{ desktop: 4, tablet: 6, mobile: 12 }}
        sx={{ cursor: 'pointer' }}
      >
        <Card
          sx={{
            border: '1px solid #fff',
            backgroundColor: '#D6D6D6',
            minHeight: '234px',
            position: 'relative',
            borderRadius: '8px',
            padding: '0',
            boxShadow: 'unset'
          }}
          onClick={() => onSelectTemplate(template)}
        >
          <CardContent sx={{ paddingBottom: '0px !important', padding: '13px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <img
                src={
                  template.thumbnail
                    ? `/${template.thumbnail}`
                    : `/icons/template/${template.id}.svg`
                }
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                alt={template.name}
              />
            </Box>

            <CardActions sx={{ position: 'absolute', bottom: 0, padding: '10px' }}>
              <ChevronRightIcon sx={arrowIconStyles} />
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: 16,
                }}
                variant="h4"
              >
                {template.name}
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

const arrowIconStyles = {
  background: 'black',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  color: 'white',
};
