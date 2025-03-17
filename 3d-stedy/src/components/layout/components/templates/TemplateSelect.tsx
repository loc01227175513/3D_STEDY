import { KitchenTemplateEntity, StoreEntity } from '@/types/model';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TemplateItem from './TemplateItem';
import theme from '@/themes';
import { LIST_TEMPLATE_MODAL } from '@/configs/constant';
import { Vector3 } from 'three';

interface Props {
  activeStore: StoreEntity | null;
  onSelectTemplate: (valueTab: KitchenTemplateEntity) => void;
}

const TemplateSelect = ({ activeStore, onSelectTemplate }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  
  const filteredTemplates = LIST_TEMPLATE_MODAL.filter(template => template.id !== 'l-shape');

  // Add missing required properties to match KitchenTemplateEntity
  const templatesWithRequiredProps: KitchenTemplateEntity[] = filteredTemplates.map(template => ({
    ...template,
    kitchenSize: new Vector3(
      template.defaultSize.w,
      template.defaultSize.h,
      template.defaultSize.d
    ),
    products: [],
    configuration: undefined // Set configuration to undefined instead of null
  }));
  
  return (
    <Box
      sx={{
        padding: '6px',
        ...(isMobile
          ? {
              overflowY: 'scroll',
              height: '500px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }
          : {}),
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '33px',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginTop: '32px',
          marginBottom: '25px',
        }}
      >
        Select template
      </Typography>
      <Grid
        container
        sx={{
          width: 'calc(100% - 104px)',
          margin: 'auto',
          marginTop: '36px',
          marginBottom: '80px',
          justifyContent: 'center',
        }}
        spacing={3}
      >
        {templatesWithRequiredProps.map((kitchenTemplates, index) => {
          return (
            <TemplateItem
              key={`${kitchenTemplates.name}-${index}`}
              index={index}
              template={kitchenTemplates}
              onSelectTemplate={onSelectTemplate}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default TemplateSelect;
