import theme from '@/themes';
import { KitchenTemplateEntity, StoreEntity } from '@/types/model';
import { Box, Modal, useMediaQuery } from '@mui/material';
import 'react';
import { useState } from 'react';
import TemplateSelect from './templates/TemplateSelect';
import TemplateForm from './templates/TemplateForm';
import { getTemplate } from '@/services/api/templates';
import { Spinner } from '@/components/spinner';

interface ModalTemplateProps {
  isVisibleModalTemplate: boolean;
  activeStore: StoreEntity | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ModalTemplates({
  isVisibleModalTemplate,
  activeStore,
}: ModalTemplateProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [template, setTemplate] = useState<KitchenTemplateEntity>();

  // Fetch the template details based on the template ID
  const hanldeGetTemplateDetail = async (id: string) => {
    try {
      setLoading(true);
      const data = await getTemplate(id);
      setTemplate(data);
      setValue(1);
    } catch (e) {
      // console.log removed from catch block
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal sx={customModal} open={isVisibleModalTemplate}>
      <Spinner loading={loading}>
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: isMobile ? 'auto' : 'auto',
            height: 'max-content',
            maxWidth: '926px',
            maxHeight: isMobile ? '80vh' : '80vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
            backgroundColor: isMobile ? 'white' : '#A1A1A1',
            backdropFilter: 'blur(10px)',
            borderRadius: '6px',
            ':focus': {
              border: '1px solid white',
              outline: 'none',
            },
            ':focus-visible': {
              border: '1px solid white',
              outline: 'none',
            },
            ':active': {
              border: '1px solid white',
              outline: 'none',
            },
            border: '1px solid white',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '350px',
          }}
        >
          <Box sx={{ width: '100%' }}>
            {/* tab 1 */}
            <CustomTabPanel value={value} index={0}>
              <TemplateSelect
                activeStore={activeStore}
                onSelectTemplate={(data: KitchenTemplateEntity) => {
                  hanldeGetTemplateDetail(data.id);
                }}
              />
            </CustomTabPanel>

            {/* tab 2 */}
            <CustomTabPanel value={value} index={1}>
              <TemplateForm
                template={template}
                handleBack={(value) => {
                  setValue(value);
                }}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      </Spinner>
    </Modal>
  );
}

const customModal = {
  '& .MuiModal-backdrop': {
    top: '46px',
    background: '#989898',
  },
};
