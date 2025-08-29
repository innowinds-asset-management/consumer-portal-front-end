"use client";

import React, { useState, useEffect } from "react";

import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ServiceRequestTab from '@/components/ServiceRequestTab'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button, Modal, Form } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { warrantyTypeService, WarrantyType } from '@/services/api/warrantyTypes'
import { assetStatusService, AssetStatus } from '@/services/api/assetStatus'
import { Location } from '@/services/api/assets'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';



export default function AssetDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('aid');

  const [asset, setAsset] = useState<Asset | null>(null);
  const [assetType, setAssetType] = useState<AssetType | null>(null);
  const [assetSubType, setAssetSubType] = useState<AssetSubType | null>(null);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [assetLocation, setAssetLocation] = useState<{ locations: Location[] } | null>(null);
  const [assetDepartment, setDepartmnet] = useState<{ department: Department } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingWarranties, setLoadingWarranties] = useState(false);
  const [warrantiesLoaded, setWarrantiesLoaded] = useState(false);
  const [error, setError] = useState("");
  
  // Modal and Asset Status states
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showInitiateActivateModal, setShowInitiateActivateModal] = useState(false);
  const [assetStatuses, setAssetStatuses] = useState<any[]>([]);
  const [loadingAssetStatuses, setLoadingAssetStatuses] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Initiate Activate Modal states
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [selectedAssetStatus, setSelectedAssetStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  
  // Warranty states
  const [warrantyTypes, setWarrantyTypes] = useState<WarrantyType[]>([]);
  const [loadingWarrantyTypes, setLoadingWarrantyTypes] = useState(false);
  const [selectedWarrantyType, setSelectedWarrantyType] = useState("");
  const [selectedCoverageType, setSelectedCoverageType] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState<number>(0);
  const [warrantyStartDate, setWarrantyStartDate] = useState("");
  const [warrantyEndDate, setWarrantyEndDate] = useState("");
  const [autoCalculated, setAutoCalculated] = useState(false);
  const [assetWarranties, setAssetWarranties] = useState<Warranty[]>([]);
  const [loadingAssetWarranties, setLoadingAssetWarranties] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [warrantyTypesLoaded, setWarrantyTypesLoaded] = useState(false);
  
  // Message states
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

  useEffect(() => {
    const fetchAssetDetails = async () => {
      if (!assetId) {
        setError("Asset ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Fetch asset details
        const assetData = await assetsService.getAssetById(assetId);

        setAsset(assetData);

        // Set asset type and sub-type from response data
        setAssetType(assetData.assetType || null);
        setAssetSubType(assetData.assetSubType || null);
        //fetch location details
        const locationData = { locations: assetData.locations || [] };
        setAssetLocation(locationData);
        //set department details
        const departmentData = { department: assetData.department || null };
        setDepartmnet(departmentData);

        // Set warranties from asset response data for immediate warranty status calculation
        setWarranties((assetData as any).warranties || []);
        setWarrantiesLoaded(true);

        // Warranty data will be loaded on-demand when user clicks Warranty tab (for detailed view)

      } catch (err) {
        console.error('Error fetching asset details:', err);
        setError("Failed to load asset details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const initializePage = async () => {
      await fetchAssetDetails();
      await fetchAssetStatuses(); // Fetch asset statuses on page load
    };

    initializePage();
  }, [assetId]);




  const loadWarranties = async () => {
    if (!assetId || warrantiesLoaded) return;

    try {
      setLoadingWarranties(true);
      const warrantyData = await warrantyService.getWarrantiesByAssetId(assetId);
      setWarranties(warrantyData);
      setWarrantiesLoaded(true);
    } catch (warrantyErr) {
      console.error('Error fetching warranty data:', warrantyErr);
      setWarranties([]);
      setWarrantiesLoaded(true);
    } finally {
      setLoadingWarranties(false);
    }
  };

  const handleTabSelect = (eventKey: string | null) => {
    if (eventKey === 'warranty' && !warrantiesLoaded) {
      loadWarranties();
    }
  };

  const fetchAssetStatuses = async () => {
    try {
      setLoadingAssetStatuses(true);
      const response = await assetStatusService.getAssetStatuses();
      
      if (response.success) {
        setAssetStatuses(response.data);
      } else {
        console.error('Failed to fetch asset statuses:', response.error);
      }
    } catch (error) {
      console.error('Error fetching asset statuses:', error);
    } finally {
      setLoadingAssetStatuses(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true);
      const deptData = await departmentService.getDepartments();
      setDepartments(deptData);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchWarrantyTypes = async () => {
    try {
      setLoadingWarrantyTypes(true);
      const warrantyTypesData = await warrantyTypeService.getWarrantyTypesByConsumerId();
      console.log('Fetched warranty types:', warrantyTypesData);
      setWarrantyTypes(warrantyTypesData);
      setWarrantyTypesLoaded(true);
    } catch (error) {
      console.error('Error fetching warranty types:', error);
    } finally {
      setLoadingWarrantyTypes(false);
    }
  };

  // Handle warranty type dropdown click to load warranty types
  const handleWarrantyTypeDropdownClick = async () => {
    // Only fetch if not already loaded and not currently loading
    if (warrantyTypes.length === 0 && !loadingWarrantyTypes) {
      await fetchWarrantyTypes();
    }
  };

  // Auto-calculate warranty end date when period and start date change
  const calculateWarrantyEndDate = (startDate: string, period: number) => {
    if (startDate && period > 0) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + period);
      return end.toISOString().split('T')[0];
    }
    return "";
  };

  // Auto-calculate start and end dates based on period from today
  const calculateDatesFromPeriod = (period: number) => {
    if (period > 0) {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + period);
      return {
        startDate: startDate,
        endDate: endDate.toISOString().split('T')[0]
      };
    }
    return { startDate: "", endDate: "" };
  };

  // Auto-calculate warranty period when start and end dates change
  const calculateWarrantyPeriod = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
      return diffMonths;
    }
    return 0;
  };

  // Handle warranty period change
  const handleWarrantyPeriodChange = (value: number) => {
    setWarrantyPeriod(value);
    
    if (value > 0) {
      if (warrantyStartDate) {
        // If start date exists, calculate end date based on start date + period
        const calculatedEndDate = calculateWarrantyEndDate(warrantyStartDate, value);
        setWarrantyEndDate(calculatedEndDate);
        setAutoCalculated(true);
      } else {
        // If no start date exists, calculate both start and end dates from today
        const calculatedDates = calculateDatesFromPeriod(value);
        setWarrantyStartDate(calculatedDates.startDate);
        setWarrantyEndDate(calculatedDates.endDate);
        setAutoCalculated(true);
      }
    } else {
      // If period is 0 or empty, clear the dates
      setWarrantyStartDate("");
      setWarrantyEndDate("");
      setAutoCalculated(false);
    }
  };

  // Handle warranty start date change
  const handleWarrantyStartDateChange = (value: string) => {
    setWarrantyStartDate(value);
    // Clear end date error when start date changes
    setEndDateError(false);
    
    if (value && warrantyPeriod > 0) {
      // Calculate end date based on new start date + existing period
      const calculatedEndDate = calculateWarrantyEndDate(value, warrantyPeriod);
      setWarrantyEndDate(calculatedEndDate);
      setAutoCalculated(true);
    } else if (!value) {
      // If start date is cleared, also clear end date
      setWarrantyEndDate("");
      setAutoCalculated(false);
    }
  };

  // Handle warranty end date change
  const handleWarrantyEndDateChange = (value: string) => {
    // Validate that end date is not less than start date
    if (warrantyStartDate && value && new Date(value) < new Date(warrantyStartDate)) {
      setMessage({ type: 'error', text: 'Warranty End Date cannot be less than Warranty Start Date' });
      setEndDateError(true);
      return;
    }
    
    setEndDateError(false);
    setWarrantyEndDate(value);
    if (warrantyStartDate && value) {
      const calculatedPeriod = calculateWarrantyPeriod(warrantyStartDate, value);
      setWarrantyPeriod(calculatedPeriod);
      setAutoCalculated(true);
    }
  };

  const handleUpdateStatusClick = () => {
    setShowUpdateStatusModal(true);
    fetchAssetStatuses();
  };

  const handleInitiateActivateClick = async () => {
    setShowInitiateActivateModal(true);
    fetchAssetStatuses();
    fetchDepartments();
    fetchWarrantyTypes(); // Load warranty types automatically when modal opens
    
    // Pre-populate fields if asset has existing data
    if (assetId && asset) {
      // Pre-populate asset status and department
      setSelectedAssetStatus(asset.status || "");
      setSelectedDepartment(asset.departmentId || "");
      setAssignedTo(asset.assetAssignTo || "");
      
      // Fetch and populate warranty data based on asset ID
      try {
        setLoadingAssetWarranties(true);
        const existingWarranties = await warrantyService.getWarrantiesByAssetId(assetId);
        console.log('Fetched warranties for asset:', existingWarranties);
        
        // Store all warranties for the asset
        setAssetWarranties(existingWarranties || []);
        
        if (existingWarranties && existingWarranties.length > 0) {
          // Use the most recent active warranty or the first one
          const currentWarranty = existingWarranties.find(w => w.isActive) || existingWarranties[0];
          
          // Populate all warranty fields with the fetched data
          // Store the warranty type ID for later use when warranty types are loaded
          const warrantyTypeId = currentWarranty.warrantyType?.warrantyTypeId?.toString() || "";
          setSelectedWarrantyType(warrantyTypeId);
          setSelectedCoverageType(currentWarranty.coverageType || "");
          setWarrantyPeriod(currentWarranty.warrantyPeriod || 0);
          
          // Format dates properly for the date inputs
          if (currentWarranty.startDate) {
            const startDate = new Date(currentWarranty.startDate);
            setWarrantyStartDate(startDate.toISOString().split('T')[0]);
          }
          
          if (currentWarranty.endDate) {
            const endDate = new Date(currentWarranty.endDate);
            setWarrantyEndDate(endDate.toISOString().split('T')[0]);
          }
          
          console.log('Populated warranty data:', {
            warrantyType: currentWarranty.warrantyType?.warrantyTypeId,
            coverageType: currentWarranty.coverageType,
            period: currentWarranty.warrantyPeriod,
            startDate: currentWarranty.startDate,
            endDate: currentWarranty.endDate
          });
        } else {
          console.log('No warranty data found for asset:', assetId);
          // Reset warranty fields if no warranty exists
          setSelectedWarrantyType("");
          setSelectedCoverageType("");
          setWarrantyPeriod(0);
          setWarrantyStartDate("");
          setWarrantyEndDate("");
        }
      } catch (error) {
        console.error('Error fetching warranty data for asset:', error);
        // Reset warranty fields on error
        setSelectedWarrantyType("");
        setSelectedCoverageType("");
        setWarrantyPeriod(0);
        setWarrantyStartDate("");
        setWarrantyEndDate("");
        setAssetWarranties([]);
      } finally {
        setLoadingAssetWarranties(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowUpdateStatusModal(false);
    setSelectedStatus("");
  };

  const handleCloseInitiateModal = () => {
    setShowInitiateActivateModal(false);
    setSelectedAssetStatus("");
    setSelectedDepartment("");
    setAssignedTo("");
    setSelectedWarrantyType("");
    setSelectedCoverageType("");
    setWarrantyPeriod(0);
    setWarrantyStartDate("");
    setWarrantyEndDate("");
    setAutoCalculated(false);
    setAssetWarranties([]);
    setLoadingAssetWarranties(false);
    setEndDateError(false);
    setWarrantyTypesLoaded(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      setMessage({ type: 'error', text: 'Please select a status' });
      return;
    }
    
    try {
      const response = await assetsService.updateAsset(assetId!, { status: selectedStatus });
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Asset status updated successfully!' });
        
        // Refetch asset data to get the updated information
        const updatedAssetData = await assetsService.getAssetById(assetId!);
        setAsset(updatedAssetData);
        
        // Close modal after successful update
        handleCloseModal();
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to update asset status' });
      }
    } catch (error) {
      console.error('Error updating asset status:', error);
      setMessage({ type: 'error', text: 'Error updating asset status' });
    }
  };

  const handleInitiateActivation = async () => {
    if (!selectedAssetStatus || !selectedDepartment) {
      setMessage({ type: 'error', text: 'Please select both asset status and department' });
      return;
    }
    
    if (!selectedWarrantyType || !selectedCoverageType || !warrantyPeriod || !warrantyStartDate) {
      setMessage({ type: 'error', text: 'Please fill in all required warranty fields' });
      return;
    }
    
    // Validate that end date is not less than start date
    if (warrantyEndDate && warrantyStartDate && new Date(warrantyEndDate) < new Date(warrantyStartDate)) {
      setMessage({ type: 'error', text: 'Warranty End Date cannot be less than Warranty Start Date' });
      return;
    }
    
    try {
      // Calculate end date if not provided
      const calculatedEndDate = warrantyEndDate || new Date(new Date(warrantyStartDate).getTime() + warrantyPeriod * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Create the JSON data structure as required
      const updateData = {
        asset: {
          assetId: assetId!,
          status: selectedAssetStatus,
          departmentId: selectedDepartment,
          assetAssignTo: assignedTo || null
        },
        warranty: {
          warrantyTypeId: parseInt(selectedWarrantyType),
          startDate: warrantyStartDate,
          endDate: calculatedEndDate,
          warrantyPeriod: warrantyPeriod,
          coverageType: selectedCoverageType
        }
      };

      console.log('Sending update data:', updateData);

      // Call the new API endpoint
      const response = await assetsService.updateAssetWarranty(assetId!, updateData);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Asset and warranty information updated successfully!' });
        
        // Refetch asset data to get the updated information
        const updatedAssetData = await assetsService.getAssetById(assetId!);
        setAsset(updatedAssetData);
        
        // Refetch warranties to get the updated warranty information
        try {
          const updatedWarrantyData = await warrantyService.getWarrantiesByAssetId(assetId!);
          setWarranties(updatedWarrantyData);
        } catch (warrantyError) {
          console.error('Error fetching updated warranties:', warrantyError);
          // Don't show error to user as asset update was successful
        }
        
        // Close modal after successful update
        handleCloseInitiateModal();
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to update asset and warranty' });
      }
    } catch (error) {
      console.error('Error updating asset and warranty:', error);
      setMessage({ type: 'error', text: 'Error updating asset and warranty' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  if (loading) {
    return (
      <>
        <ComponentContainerCard title="Loading Asset Details">
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading asset details...</p>
          </div>
        </ComponentContainerCard>
      </>
    );
  }

  if (error || !asset) {
    return (
      <>
        <ComponentContainerCard title="Error">
          <Alert variant="danger">
            {error || "Asset not found"}
          </Alert>
        </ComponentContainerCard>
      </>
    );
  }



  return (
    <>
      <ComponentContainerCard
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>{`${asset.assetName}(${asset.consumerSerialNo})`}</span>
            <div className="d-flex gap-2">
              <Button 
                variant="success" 
                size="sm"
                onClick={handleInitiateActivateClick}
              >
                Initiate Activate
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleUpdateStatusClick}
              >
                Edit Status
              </Button>
            </div>
          </div>
        }
      // description="Detailed information about the selected asset"
      >
        {/* Overview Section - Above Tabs */}
        <Row className="mb-4">
          <Col sm="12">
            <Card className="border-0">
              <CardBody>
                <Row>
                  <Col lg={6}>
                    {/* <h6 className="text-muted mb-3">Asset Information</h6> */}
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {asset.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Type:</strong> {assetType?.assetName || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Sub Type:</strong> {assetSubType?.name || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Brand:</strong> {asset.brand}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {asset.model}
                    </div>
                    {asset.subModel && (
                      <div className="mb-3">
                        <strong>Sub Model:</strong> {asset.subModel}
                      </div>
                    )}
                    <div className="mb-3">
                      <strong>Part Number:</strong> {asset.partNo}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Status:</strong>
                        <Badge bg={
                          (() => {
                            if (!asset.status) return 'warning';
                            const statusData = assetStatuses.find(s => s.statusCode === asset.status);
                            if (!statusData) return 'warning';                            
                            // Use group from assetStatuses to determine badge color
                            switch (statusData.group) {
                              case 'ACTIVE':
                                return 'success';
                              case 'PRE_ACTIVE':
                                return 'primary';
                              case 'RETIRED':
                                return 'secondary';
                              default:
                                return 'warning';
                            }
                          })()
                        } className="ms-2">
                          {asset.status ? 
                            (() => {
                              const statusData = assetStatuses.find(s => s.statusCode === asset.status);
                              return statusData ? statusData.displayName : 'N/A';
                            })() : 
                            'N/A'
                          }
                      </Badge>

                    </div>
                    <div className="mb-3">
                      <strong>Assigned To:</strong> {asset.assetAssignTo || 'N/A'}
                    </div>
                  </Col>
                  <Col lg={6}>
                    {/* <h6 className="text-muted mb-3">Technical Details</h6> */}
                    <div className="mb-3">
                      <strong>Serial No:</strong> {asset.consumerSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Name:</strong> {asset.supplier?.name || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Serial No:</strong> {asset.supplierSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Department:</strong> {asset.department?.deptName || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Warranty Status:</strong>
                      <Badge bg={
                        (() => {
                          // Check if warranties array exists and has items
                          if (warranties && warranties.length > 0) {
                            // Get the most recent active warranty
                            const activeWarranties = warranties.filter((w: Warranty) => w.isActive);
                            if (activeWarranties.length > 0) {
                              const currentDate = new Date();
                              const startDate = new Date(activeWarranties[0].startDate);
                              const endDate = new Date(activeWarranties[0].endDate);
                              
                              if (currentDate < startDate) return 'warning';
                              if (currentDate > endDate) return 'danger';
                              return 'success';
                            }
                          }
                          return 'secondary';
                        })()
                      } className="ms-2">
                        {(() => {
                          // Check if warranties array exists and has items
                          if (warranties && warranties.length > 0) {
                            // Get the most recent active warranty
                            const activeWarranties = warranties.filter((w: Warranty) => w.isActive);
                            if (activeWarranties.length > 0) {
                              const currentDate = new Date();
                              const startDate = new Date(activeWarranties[0].startDate);
                              const endDate = new Date(activeWarranties[0].endDate);
                              
                              if (currentDate < startDate) return 'Not Started';
                              if (currentDate > endDate) return 'Expired';
                              return 'Active';
                            }
                          }
                          return 'No Warranty';
                        })()}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <strong>Last Service Date:</strong> {
                        (() => {
                          // Get the most recent service request based on updatedAt
                          if (asset.serviceRequests && asset.serviceRequests.length > 0) {
                            const sortedRequests = [...asset.serviceRequests].sort((a, b) => 
                              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                            );
                            return formatDate(sortedRequests[0].updatedAt);
                          }
                          // Fallback to lastServiceDate if no service requests
                          return asset.lastServiceDate ? formatDate(asset.lastServiceDate) : 'N/A';
                        })()
                      }
                    </div>
                    <div className="mb-3">
                      <strong>Asset Condition:</strong> {
                        typeof asset.assetCondition === 'object' && asset.assetCondition?.name 
                          ? asset.assetCondition.name 
                          : (typeof asset.assetCondition === 'string' ? asset.assetCondition : 'N/A')
                      }
                    </div>
                    <div className="mb-3">
                      <strong>AMC:</strong>
                      <Badge bg={asset.isAmc ? 'success' : 'secondary'} className="ms-2">
                        {asset.isAmc ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <TabContainer defaultActiveKey="department" onSelect={handleTabSelect}>
          <Nav role="tablist" className="nav-tabs nav-bordered mb-3">
            <NavItem as="li" role="presentation">
              <NavLink eventKey="department">
                <IconifyIcon icon="tabler:building" className="fs-18 me-1" />
                Transfers
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="warranty">
                <IconifyIcon icon="tabler:shield-check" className="fs-18 me-1" />
                Warranty
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="serviceRequest">
                <IconifyIcon icon="tabler:history" className="fs-18 me-1" />
                Service Request
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent>

            {/* Warranty Tab */}
            <TabPane eventKey="warranty" id="warranty">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <h6 className="text-muted mb-3">Warranty Information</h6>
                      {loadingWarranties ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2 text-muted">Loading warranty information...</p>
                        </div>
                      ) : warranties.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted">No warranty information available</p>
                        </div>
                      ) : (
                        warranties.map((warranty, index) => (
                          <div key={warranty.warrantyId} className={index > 0 ? "mt-4" : ""}>
                            <h6 className="text-primary mb-3">Warranty #{warranty.warrantyNumber}</h6>
                            <Table responsive striped>
                              <thead>
                                <tr>
                                  <th>Field</th>
                                  <th>Value</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><strong>Warranty Type</strong></td>
                                  <td>{warranty.warrantyType?.typeName || 'N/A'}</td>
                                  <td>
                                    <Badge bg={warranty.isActive ? 'success' : 'danger'}>
                                      {warranty.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Warranty Number</strong></td>
                                  <td>{warranty.warrantyNumber}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Coverage Type</strong></td>
                                  <td>{warranty.coverageType}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Coverage Description</strong></td>
                                  <td>{warranty.coverageDescription || 'N/A'}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Start Date</strong></td>
                                  <td>{formatDate(warranty.startDate)}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>End Date</strong></td>
                                  <td>{formatDate(warranty.endDate)}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Warranty Period</strong></td>
                                  <td>{warranty.warrantyPeriod} months</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Cost</strong></td>
                                  <td>${warranty.cost}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Auto Renewal</strong></td>
                                  <td>{warranty.autoRenewal ? 'Yes' : 'No'}</td>
                                  <td>
                                    <Badge bg={warranty.autoRenewal ? 'success' : 'secondary'}>
                                      {warranty.autoRenewal ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Supplier ID</strong></td>
                                  <td>{warranty.warrantySupplierId || 'N/A'}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Consumer ID</strong></td>
                                  <td>{warranty.consumerId}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Terms & Conditions</strong></td>
                                  <td>{warranty.termsConditions || 'N/A'}</td>
                                  <td>-</td>
                                </tr>
                              </tbody>
                            </Table>

                            {warranty.notifications && warranty.notifications.length > 0 && (
                              <div className="mt-3">
                                <h6 className="text-warning mb-2">Notifications</h6>
                                <Table responsive striped size="sm">
                                  <thead>
                                    <tr>
                                      <th>Type</th>
                                      <th>Message</th>
                                      <th>Sent Date</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {warranty.notifications.map((notification) => (
                                      <tr key={notification.notificationId}>
                                        <td>{notification.notificationType}</td>
                                        <td>{notification.message}</td>
                                        <td>{formatDate(notification.sentDate)}</td>
                                        <td>
                                          <Badge bg={notification.isSent ? 'success' : 'warning'}>
                                            {notification.isSent ? 'Sent' : 'Pending'}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Department Tab */}
            <TabPane eventKey="department" id="department">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <h6 className="text-muted mb-3">Location Information</h6>
                      {!assetLocation?.locations || assetLocation.locations.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted">No location information available</p>
                        </div>
                      ) : (
                        <Table responsive striped>
                          <thead>
                            <tr>
                              <th>Department Name</th>
                              <th>Building</th>
                              <th>Floor</th>
                              <th>Room</th>
                              <th>Current Location</th>
                              <th>Created Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assetLocation.locations.map((location: Location) => (
                              <tr key={location.id}>
                                <td>{location.departmentId ? (assetDepartment?.department?.deptName || '') : ''}</td>
                                <td>{location.building}</td>
                                <td>{location.floorNumber}</td>
                                <td>{location.roomNumber}</td>
                                <td>
                                  <Badge bg={location.isCurrentLocation ? 'success' : 'secondary'}>
                                    {location.isCurrentLocation ? 'Current' : 'Historical'}
                                  </Badge>
                                </td>
                                <td>{formatDate(location.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}

                      <div className="text-center mt-3">
                        <small className="text-muted">
                          Showing {assetLocation?.locations?.length || 0} location records
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Service Request Tab */}
            <TabPane eventKey="serviceRequest" id="serviceRequest">
              <ServiceRequestTab 
                assetId={assetId!} 
                asset={asset}
                showCreateButton={true}
                title="Service History"
              />
            </TabPane>
          </TabContent>
        </TabContainer>
      </ComponentContainerCard>

      {/* Message Display */}
      {message.type && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`} 
             style={{ top: '20px', right: '20px', zIndex: 9999, minWidth: '300px' }}>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: null, text: '' })}></button>
        </div>
      )}

      {/* Update Status Modal */}
      <Modal show={showUpdateStatusModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Asset Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingAssetStatuses ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading asset statuses...</p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Asset Status</Form.Label>
                <Form.Select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Choose a status...</option>
                  {assetStatuses.map((status) => (
                    <option key={status.statusCode} value={status.statusCode}>
                      {status.displayName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleStatusUpdate}
            disabled={!selectedStatus || loadingAssetStatuses}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Initiate Activate Modal */}
      <Modal show={showInitiateActivateModal} onHide={handleCloseInitiateModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Asset Activation & Warranty Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(loadingAssetStatuses || loadingDepartments || loadingWarrantyTypes || loadingAssetWarranties) ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading data...</p>
            </div>
          ) : (
            <Form>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Asset Status *</Form.Label>
                    <Form.Select 
                      value={selectedAssetStatus} 
                      onChange={(e) => setSelectedAssetStatus(e.target.value)}
                    >
                      <option value="">Choose a status...</option>
                      {assetStatuses.map((status) => (
                        <option key={status.statusCode} value={status.statusCode}>
                          {status.displayName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Department *</Form.Label>
                    <Form.Select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">Choose a department...</option>
                      {departments.map((dept) => (
                        <option key={dept.deptId} value={dept.deptId}>
                          {dept.deptName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assigned To</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the person assigned to this asset"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-4" />
              <h6 className="mb-3">
                <IconifyIcon icon="tabler:shield-check" className="me-2" />
                Warranty Information
              </h6>
              <p className="text-muted small mb-3">
                <IconifyIcon icon="tabler:info-circle" className="me-1" />
                Existing warranty information will be pre-filled. You can modify any field as needed. 
                <br />
                <IconifyIcon icon="tabler:calculator" className="me-1" />
                <strong>Auto-calculation:</strong> Enter warranty period to auto-calculate start and end dates from today, or enter start date to calculate end date, or enter start/end dates to calculate period.
              </p>

              {/* Display existing warranty information */}
              {loadingAssetWarranties ? (
                <div className="text-center py-2">
                  <small className="text-muted">Loading warranty data...</small>
                </div>
              ) : assetWarranties.length > 0 ? (
                <div className="mb-3 p-3 bg-light rounded">
                  <h6 className="mb-2">
                    <IconifyIcon icon="tabler:file-text" className="me-2" />
                    Current Warranty Information
                  </h6>
                  <div className="row">
                    {assetWarranties.map((warranty, index) => (
                      <div key={warranty.warrantyId} className="col-12 mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Warranty #{index + 1}:</strong> {warranty.warrantyNumber || 'N/A'}
                            <br />
                            <small className="text-muted">
                              Type: {warranty.warrantyType?.typeName || 'N/A'} | 
                              Coverage: {warranty.coverageType || 'N/A'} | 
                              Period: {warranty.warrantyPeriod || 0} months
                            </small>
                          </div>
                          <Badge bg={warranty.isActive ? "success" : "secondary"}>
                            {warranty.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-3 p-3 bg-warning bg-opacity-10 rounded">
                  <small className="text-warning">
                    <IconifyIcon icon="tabler:alert-triangle" className="me-1" />
                    No warranty information found for this asset.
                  </small>
                </div>
              )}

              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Warranty Type *</Form.Label>
                    <Form.Select 
                      value={selectedWarrantyType} 
                      onChange={(e) => setSelectedWarrantyType(e.target.value)}
                      disabled={loadingWarrantyTypes}
                    >
                      <option value="">
                        {loadingWarrantyTypes ? "Loading warranty types..." : 
                         warrantyTypesLoaded ? `Select warranty type (${warrantyTypes.length} available)` : 
                         "Select warranty type"}
                      </option>
                      {warrantyTypes.map((warrantyType) => (
                        <option key={warrantyType.warrantyTypeId} value={warrantyType.warrantyTypeId}>
                          {warrantyType.typeName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Coverage Type *</Form.Label>
                    <Form.Select 
                      value={selectedCoverageType} 
                      onChange={(e) => setSelectedCoverageType(e.target.value)}
                    >
                      <option value="">Select coverage type</option>
                      <option value="parts">Parts Only</option>
                      <option value="labor">Labor Only</option>
                      <option value="parts_labor">Parts & Labor</option>
                      <option value="comprehensive">Comprehensive</option>
                      <option value="premium">Premium</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Warranty Period (months) *</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter warranty period in months"
                      min="0"
                      value={warrantyPeriod || ""}
                      onChange={(e) => handleWarrantyPeriodChange(parseInt(e.target.value) || 0)}
                    />

                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Warranty Start Date *</Form.Label>
                    <Form.Control
                      type="date"
                      value={warrantyStartDate}
                      onChange={(e) => handleWarrantyStartDateChange(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Warranty End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={warrantyEndDate}
                      onChange={(e) => handleWarrantyEndDateChange(e.target.value)}
                      isInvalid={endDateError}
                    />
                    {endDateError && (
                      <Form.Control.Feedback type="invalid">
                        End date cannot be less than start date
                      </Form.Control.Feedback>
                    )}
                    {autoCalculated && warrantyEndDate && !endDateError && (
                      <small className="text-info">
                        <IconifyIcon icon="tabler:calculator" className="me-1" />
                        Auto-calculated
                      </small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInitiateModal}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleInitiateActivation}
            disabled={!selectedAssetStatus || !selectedDepartment || !selectedWarrantyType || !selectedCoverageType || !warrantyPeriod || !warrantyStartDate || loadingAssetStatuses || loadingDepartments || loadingWarrantyTypes || loadingAssetWarranties}
          >
            Update Asset & Warranty
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
